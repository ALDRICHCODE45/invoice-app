import { z } from "zod";

export const editUserSchema = z.object({
  firstName: z.string().min(2, "FirstName is required"),
  lastName: z.string().min(2, "FirstName is required"),
  email: z.string().email("Email is required"),
  address: z.string().min(3, "Address is required"),
});

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Adress is required"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Inovice Name is required"),

  total: z.number().min(1, "1$ is minimum"),

  status: z.enum(["PAID", "PENDING"]).default("PENDING"),

  date: z.string().min(1, "Date is required"),

  dueDate: z.number().min(0, "Due Date is required"),

  fromName: z.string().min(1, "Your Name is required"),

  fromEmail: z.string().email("Invalid Email Address"),

  fromAddress: z.string().min(1, "Your Address is required"),

  clientName: z.string().min(1, "Client Name is required"),

  clientEmail: z.string().email("Invalid Email address"),

  clientAddress: z.string().min(1, "Client address is required"),

  currency: z.string().min(1, "Currency is required"),

  invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),

  note: z.string().optional(),

  invoiceItemDescription: z.string().min(1, "Description is required"),

  invoiceItemQuantity: z.number().min(1, "Qunatity min 1"),

  invoiceItemRate: z.number().min(1, "Rate min 1"),

  terms: z.string().min(1, "Terms and conditions are required"),
});
