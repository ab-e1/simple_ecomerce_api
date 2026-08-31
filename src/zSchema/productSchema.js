import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "name can not be empty"),
  price: z.number().int().positive("price must be positive"),
  description: z.string().optional(),
  category: z.string().optional(),
  inStock: z.boolean().optional(),
})
