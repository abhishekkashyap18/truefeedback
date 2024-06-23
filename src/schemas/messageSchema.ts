import { Content } from "next/font/google";
import { z } from "zod";

export const messageSchema = z.object({
    Content: z.string()
              .min(10, {message: 'content must be atleast of 10 characters'})
              .max(300, 'content must be no longer than 300 characters')
})