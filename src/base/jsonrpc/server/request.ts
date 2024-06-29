import { z } from 'zod';

import { type Specification } from '../common/specification';

const JsonRpcRequestSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string(), z.number().int()]),
  method: z.string(),
  params: z.unknown().optional(),
});

export function validAndParseRequest(data: unknown) {
  return JsonRpcMayBeBatchRequestSchema.parse(data) as MaybeBatchRequest;
}

const JsonRpcMayBeBatchRequestSchema = z
  .array(JsonRpcRequestSchema)
  .min(1)
  .or(JsonRpcRequestSchema);

export type MaybeBatchRequest =
  | Specification.RequestObject
  | Specification.RequestObject[];

export function validAndParseBatchRequest(data: unknown) {
  return JsonRpcMayBeBatchRequestSchema.parse(data) as MaybeBatchRequest;
}
