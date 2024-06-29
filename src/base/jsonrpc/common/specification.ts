// see https://www.jsonrpc.org/specification
export namespace Specification {
  export type RequestId = string | number;

  export interface RequestObject<T = unknown> {
    jsonrpc: '2.0';
    id: RequestId;
    method: string;
    params: T;
  }

  export interface ErrorObject {
    code: number;
    message: string;
    data?: unknown;
  }

  interface ResponseObjectBase<T = unknown> {
    jsonrpc: '2.0';
    id: RequestId | null;
    error?: ErrorObject;
    result?: T;
  }

  export interface ResponseResultObject<T = unknown>
    extends ResponseObjectBase<T> {
    result: T;
  }

  export interface ResponseErrorObject<T = unknown>
    extends ResponseObjectBase<T> {
    error: ErrorObject;
  }

  export type ResponseObject<T = unknown> =
    | ResponseResultObject<T>
    | ResponseErrorObject;
}
