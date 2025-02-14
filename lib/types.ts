import { z } from "zod"

export const ticketFormSchema = z.object({
  step: z.number().min(1).max(3),
  ticketType: z.enum(["FREE", "VIP", "VVIP"]),
  quantity: z.number().min(1).max(10),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatarUrl: z.string().url({
    message: "Please provide a valid image URL.",
  }),
  specialRequest: z.string().optional(),
})

export type TicketFormValues = z.infer<typeof ticketFormSchema>

export const defaultFormValues: Partial<TicketFormValues> = {
  step: 1,
  ticketType: "FREE",
  quantity: 1,
}

