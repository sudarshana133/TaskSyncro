import { Suspense } from "react";
import { ModuleCreation } from "@/components/ModuleCreation";
import { getLoggedInUser } from "@/lib/appwrite";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ModulePage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

const ModulePage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getLoggedInUser();

  if (!user) return null;

  const newParam = searchParams.new === "true";

  if (newParam) {
    return <ModuleCreation user={user} />;
  }

  return <div>Module Page for {params.slug}</div>;
};
