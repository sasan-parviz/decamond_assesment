import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "Invalid Iranian phone number"),
  // We can add more validation schema here for more inputs
});

export type LoginFormValues = z.infer<typeof loginSchema>;
