import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter the valid email!!" }).trim(),
  password: z.string().min(1, { message: "Password not be empty" }).trim(),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter the name!!" }).trim(),
    email: z.string({ message: "Please enter the valid email!!" }).email().trim(),
    password: z
      .string()
      .min(1, { message: "Please enter the password!!" })
      .min(3, { message: "Password must be at least 3 characters" })
      //   .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
      //   .regex(/[0-9]/, { message: "Password must contain at least one number" })
      //   .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.instanceof(File, { message: "File is required" }).optional(),
  //   image: z.string().url("Invalid Url").optional(),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone must be at least 8 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
