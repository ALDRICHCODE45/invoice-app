import { type ReactElement } from "react";
import { ContentLayout } from "../../../../components/admin-panel/content-layout";
import { CreateInvoiceForm } from "../../../components/CreateInvoiceForm";
import { prisma } from "@/app/utils/db";
import { useCheckSession } from "../../../hooks/checkSession";

export interface pageProps {}

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
};

export default async function page({}: pageProps): Promise<ReactElement> {
  const session = await useCheckSession("/login");

  const userData = await getData(session.user?.id!);

  return (
    <>
      <ContentLayout title="Create Invoice">
        <CreateInvoiceForm
          address={userData?.address!}
          email={userData?.email!}
          firstName={userData?.firstName!}
          lastName={userData?.lastName!}
        />
      </ContentLayout>
    </>
  );
}
