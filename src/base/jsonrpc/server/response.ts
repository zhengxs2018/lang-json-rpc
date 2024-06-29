import type { H3Event } from 'h3';

import { JsonRpcError } from '../common/error';
import type { Specification } from '../common/specification';

export type JsonRpcMessageHandler = (
  event: H3Event,
  method: string,
  params: unknown,
) => Awaited<unknown>;

export async function jsonOutput(
  event: H3Event,
  message: Specification.RequestObject,
  handler: JsonRpcMessageHandler,
): Promise<Specification.ResponseObject> {
  try {
    return {
      jsonrpc: '2.0',
      id: message.id,
      result: await handler(event, message.method, message.params),
    };
  } catch (error) {
    if (error instanceof JsonRpcError) {
      return {
        jsonrpc: '2.0',
        id: message.id,
        error: error.toJSON(),
      };
    }

    console.error('Error generating response', (error as Error).message);

    return {
      jsonrpc: '2.0',
      id: message.id,
      error: JsonRpcError.generate(-32603, 'Internal error').toJSON(),
    };
  }
}
