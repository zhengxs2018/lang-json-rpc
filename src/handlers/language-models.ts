import { z } from 'zod';

import { jsonrpc } from '../base/jsonrpc/server/server';
import { procedure } from '../base/jsonrpc/server/procedure';

export default jsonrpc({
  chat: procedure({
    input: z.object({
      model: z.string(),
      messages: z
        .array(
          z.object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string(),
          }),
        )
        .min(1),
    }),
    query() {
      return 'Please call the Language Model API';
    },
  }),
  completion: {
    input: z.object({
      model: z.string(),
      system: z.string().optional(),
      prompt: z.string(),
    }),
    query() {
      return 'Please call the Language Model API';
    },
  },
  infill: {
    input: z.object({
      model: z.string(),
      prompt: z.string(),
      suffix: z.string().optional(),
    }),
    query() {
      return 'Please call the Language Model API';
    },
  },
  embedding: {
    input: z.object({
      model: z.string(),
      input: z.array(z.string()).or(z.string()),
      type: z.enum(['db', 'query']).default('query'),
    }),
    query() {
      return 'Please call the Language Model API';
    },
  },
});
