"use server";

import { useCheckSession as checkSession } from "./hooks/checkSession";
import { parseWithZod } from "@conform-to/zod";
import {
  editUserSchema,
  invoiceSchema,
  onboardingSchema,
} from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
import { revalidatePath } from "next/cache";

export const onboardUser = async (prevState: unknown, formData: FormData) => {
  const session = await checkSession("/login");

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  redirect("/dashboard");
};

export const createInvoice = async (prevState: any, formData: FormData) => {
  const session = await checkSession("/login");

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const invoice = await prisma.invoice.create({
    data: {
      terms: submission.value.terms,
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      Note: submission.value.note,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@aldrichcode.dev",
    name: "Aldrich",
  };

  emailClient.send({
    from: sender,
    to: [{ email: submission.value.clientEmail! }],
    template_uuid: "da5d6f2c-479e-434e-aff4-221ee9cd86c9",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-Us", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      total: formatCurrency(submission.value.total),
      invoice_link: `http://localhost:3000/api/invoice/${invoice.id}`,
    },
  });

  return redirect("/dashboard/invoices/");
};

export const updateInvoice = async (prevState: any, formData: FormData) => {
  const session = await checkSession("/login");

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      Note: submission.value.note,
    },
  });

  redirect("/dashboard/invoices");
};

export const markAsPaid = async (invoiceId: string): Promise<void> => {
  await checkSession("/login");

  await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  revalidatePath("/dashboard/invoices");
};

export const deleteInvoice = async (invoiceId: string): Promise<void> => {
  await checkSession("/login");

  await prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  });

  revalidatePath("/dashboard/invoices");
};

export const editUser = async (prevState: any, formData: FormData) => {
  const user = await checkSession("/login");

  const submission = parseWithZod(formData, {
    schema: editUserSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: user.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      email: submission.value.email,
      address: submission.value.address,
    },
  });
  revalidatePath("/dashboard/account");
};
