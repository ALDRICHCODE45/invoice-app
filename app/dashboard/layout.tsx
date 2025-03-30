import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useCheckSession } from "../hooks/checkSession";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

async function getUser(userid: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });
  if (!user?.address || !user.firstName || !user.lastName) {
    return redirect("/onboarding");
  }
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await useCheckSession("/login");
  await getUser(session.user?.id!);
  return (
    <AdminPanelLayout>
      <div className="w-full">{children}</div>
    </AdminPanelLayout>
  );
}
