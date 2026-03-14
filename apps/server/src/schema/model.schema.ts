import z from "zod";

export const sendMessageSchema = z.object({
    body: z.object({
        message: z.string(),
    }),
    params: z.object({
        sessionId: z.string(),
    }),
})

export type sendMessageInput = z.TypeOf<typeof sendMessageSchema>;