import { revalidatePath } from "next/cache";
import { useCheckSession } from "../../../hooks/checkSession";
import { prisma } from "@/app/utils/db";

export const markAsPaid = async (invoiceId: string) => {
  await useCheckSession("/login");

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
