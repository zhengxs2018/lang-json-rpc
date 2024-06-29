import type { H3EventContext } from 'h3';
import type { z } from 'zod';

export type ProcedureObject<T extends z.ZodTypeAny> = {
  input: T;
  query: (event: {
    headers: Headers;
    context: H3EventContext;
    input: z.TypeOf<T>;
  }) => Awaited<unknown>;
};

export const procedure = <T extends z.ZodTypeAny>(
  options: ProcedureObject<T>,
) => options;
