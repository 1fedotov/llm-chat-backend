import z from "zod";

// Request validation schema for chat/:sessionId end point
export const sendMessageSchema = z.object({
  body: z.object({
    message: z.string(),
  }),
  params: z.object({
    sessionId: z.string(),
  }),
});

export type sendMessageInput = z.TypeOf<typeof sendMessageSchema>;
