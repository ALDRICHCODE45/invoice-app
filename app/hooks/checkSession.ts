import { redirect } from "next/navigation";
import { auth } from "../utils/auth";

export const useCheckSession = async (path: string) => {
  const session = await auth();
  if (!session) {
    redirect(path);
  }
  return session;
};
