import { type ReactElement } from "react";
import { Dashboard } from "../components/DashboardPage";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export interface pageProps {}

export default function page({}: pageProps): ReactElement {
  return (
    <>
      <ContentLayout title="Dashboard">
        <Dashboard />
      </ContentLayout>
    </>
  );
}
