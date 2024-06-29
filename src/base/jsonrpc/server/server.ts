import { eventHandler, H3Event, readValidatedBody } from 'h3';

import { createError } from '../common/error';
import type { ProcedureObject } from './procedure';
import { type MaybeBatchRequest, validAndParseBatchRequest } from './request';
import { jsonOutput } from './response';

// TODO support notifications
export function jsonrpc(handlersMap: Record<string, ProcedureObject<any>>) {
  async function invoke(event: H3Event, method: string, params: unknown) {
    const handler = handlersMap[method];

    if (!handler) {
      throw createError(-32601, `Method not found: ${method}`);
    }

    let input: { [x: string]: unknown };

    try {
      input = handler.input.parse(params);
    } catch (error) {
      console.error('Error parsing input', (error as Error).message);

      throw createError(-32602, 'Invalid params');
    }

    try {
      return await handler.query({
        context: event.context,
        headers: event.headers,
        input: input,
      });
    } catch (error) {
      console.error('Error invoking method', (error as Error).message);
      throw createError(-32603, 'Internal error');
    }
  }

  return eventHandler(async event => {
    let request: MaybeBatchRequest;
    try {
      request = await readValidatedBody(event, validAndParseBatchRequest);
    } catch (error) {
      console.error(
        'Error parsing ipc message',
        event.path,
        (error as Error).message,
      );

      return {
        statusCode: 400,
        body: {
          error: {
            code: -32600,
            message: 'Invalid Request',
          },
        },
      };
    }

    if (Array.isArray(request)) {
      return Promise.all(
        request.map(message => {
          return jsonOutput(event, message, invoke);
        }),
      );
    }

    return jsonOutput(event, request, invoke);
  });
}
