import { type ReactElement } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceTable } from "./components/table";
import { invoiceColumns } from "./components/columns";
import { prisma } from "../../utils/db";
import { useCheckSession } from "../../hooks/checkSession";
import { Prisma } from "@prisma/client";

export interface pageProps {}

const getData = async (
  userId: string,
): Promise<
  Prisma.InvoiceGetPayload<{
    select: {
      id: true;
      clientName: true;
      total: true;
      date: true;
      status: true;
      invoiceNumber: true;
    };
  }>[]
> => {
  return await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      date: true,
      status: true,
      invoiceNumber: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default async function InvoicesPage({}: pageProps): Promise<ReactElement> {
  const session = await useCheckSession("/login");
  const data = await getData(session.user?.id!);

  return (
    <ContentLayout title="Invoices">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
              <CardDescription>Manage your invoices right here</CardDescription>
            </div>
            <Link
              href="/dashboard/invoices/create"
              className={buttonVariants({ variant: "outline" })}
            >
              <PlusIcon />
              Create Invoice
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <InvoiceTable
            columns={invoiceColumns}
            data={data as unknown as any}
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
