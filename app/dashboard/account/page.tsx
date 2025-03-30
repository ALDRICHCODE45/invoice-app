import { type ReactElement } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ProfileEditPage } from "@/app/components/EditProfilePage";
import { useCheckSession } from "@/app/hooks/checkSession";
import { prisma } from "@/app/utils/db";

export interface pageProps {}

export default async function page({}: pageProps): Promise<ReactElement> {
  const session = await useCheckSession("/login");

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      address: true,
      firstName: true,
      email: true,
      lastName: true,
    },
  });

  return (
    <ContentLayout title="Account">
      <ProfileEditPage
        address={user?.address!}
        email={user?.email!}
        firstName={user?.firstName!}
        lastName={user?.lastName!}
      />
    </ContentLayout>
  );
}
