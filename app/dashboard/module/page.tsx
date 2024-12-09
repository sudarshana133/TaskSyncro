"use client";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";
import { ModuleCreation } from "@/components/ModuleCreation";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ModulePage/>
    </Suspense>
  )  
};

export default Page;

const ModulePage = ()=>{
  const { user } = useUser();
  const params = useSearchParams();
  const newParam = params.get("new");

  if (!user) return null;
  
  if (newParam) {
    return <ModuleCreation user={user} />;
  }
  return <div>Page</div>;
}