import { getLoggedInUser } from "@/lib/appwrite";
import { ModuleCreation } from "@/components/ModuleCreation";

export default async function Page() {
  const user = await getLoggedInUser();
  if (!user) return;
  return <ModuleCreation user={user} />;
}