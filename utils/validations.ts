import z from "zod";

export const userSchema = z.object({
  id: z.number().transform((val) => val.toString()),
  name: z.string(),
  picture: z.string(),
});

export const usersSchema = z.array(userSchema);

export const messageSchema = z.object({
  sender_id: z.number().transform((val) => val.toString()),
  receiver_id: z.number().transform((val) => val.toString()),
  message: z.string(),
  created_at: z.string(),
});

export const messagesSchema = z.array(messageSchema);
