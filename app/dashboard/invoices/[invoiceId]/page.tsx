import { type ReactElement } from "react";
import { prisma } from "@/app/utils/db";
import { ContentLayout } from "../../../../components/admin-panel/content-layout";
import { useCheckSession } from "../../../hooks/checkSession";
import { notFound } from "next/navigation";
import { EditInvoice } from "@/app/components/EditInvoice";

export interface pageProps {
  params: Promise<{ invoiceId: string }>;
}

const getData = async (invoiceId: string, userId: string) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
    include: {
      User: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          address: true,
        },
      },
    },
  });

  if (!invoice) {
    return notFound();
  }
  return invoice;
};

export default async function page({
  params,
}: pageProps): Promise<ReactElement> {
  const { invoiceId } = await params;
  const session = await useCheckSession("/login");
  const invoice = await getData(invoiceId, session.user?.id!);

  if (!invoice) {
    return (
      <>
        <p>No invoice with id {invoiceId}</p>
      </>
    );
  }

  return (
    <ContentLayout title="Edit Invoice">
      <EditInvoice data={invoice} />
    </ContentLayout>
  );
}
