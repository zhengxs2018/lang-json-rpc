// see http://www.jsonrpc.org/specification#error_object
import { type Specification } from './specification';

const JSON_RPC_MESSAGES: Record<string, string> = {
  '-32700': 'Parse error',
  '-32600': 'Invalid Request',
  '-32601': 'Method not found',
  '-32602': 'Invalid params',
  '-32603': 'Internal error',
  '-32000': 'Server error',
};

const hasOwn = Object.prototype.hasOwnProperty;

export function isValidCode(code: number) {
  if (hasOwn.call(JSON_RPC_MESSAGES, code)) {
    return true;
  }

  if (code < -32099 || code > -32000) {
    return false;
  }

  return true;
}

export function getCodeMessage(code: number) {
  return JSON_RPC_MESSAGES[code] || 'Server error';
}

export function createError(code: number, message?: string) {
  if (!isValidCode(code)) {
    throw new Error('Invalid code');
  }

  return new JsonRpcError(code, message, undefined);
}

export class JsonRpcError extends Error implements Specification.ErrorObject {
  readonly code: number;
  readonly data: unknown | undefined;

  constructor(
    code: number,
    message: string | undefined,
    data: unknown | undefined,
  ) {
    super(message || getCodeMessage(code));

    this.code = code;
    this.data = data;
  }

  toJSON(): Specification.ErrorObject {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }

  static generate(
    code: number,
    message?: string | undefined,
    data?: unknown | undefined,
  ) {
    if (code == -32700) {
      return new ParseError(code, message, data);
    }

    if (code == -32600) {
      return new InvalidRequest(code, message, data);
    }

    if (code == -32601) {
      return new MethodNotFound(code, message, data);
    }

    if (code == -32602) {
      return new InvalidParams(code, message, data);
    }

    if (code == -32603) {
      return new InternalError(code, message, data);
    }

    // -32000 to -32099 Reserved for implementation-defined server-errors.
    if (code >= -32099 && code <= -32000) {
      return new ServerError(code, message, data);
    }

    return new InternalError(-32603, 'Invalid code', data);
  }
}

export class ParseError extends JsonRpcError {
  override readonly code = -32700;
}

export class InvalidRequest extends JsonRpcError {
  override readonly code = -32600;
}

export class MethodNotFound extends JsonRpcError {
  override readonly code = -32601;
}

export class InvalidParams extends JsonRpcError {
  override readonly code = -32602;
}

export class InternalError extends JsonRpcError {
  override readonly code = -32603;
}

export class ServerError extends JsonRpcError {
  override readonly code = -32000;
}
