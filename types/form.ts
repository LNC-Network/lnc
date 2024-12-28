import { z } from "zod";
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    institution: z.string().optional(),
    portfolio: z.string().url("Invalid URL").optional(),
    about: z.string().optional(),
    role: z.string().min(1, "Role is required"),
    status: z.string().min(1, "Status is required"),
});
export type FormData = z.infer<typeof formSchema>;
export { formSchema };

//this file is for data-structure