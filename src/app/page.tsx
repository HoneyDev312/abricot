import { redirect } from "next/navigation";
import { getAuthToken } from "@/features/auth/services/session.service";

export default async function Home() {
  const token = await getAuthToken();

  redirect(token ? "/dashboard" : "/login");
}
