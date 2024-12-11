import Welcome from "@/components/client/Welcome";
import Modules from "@/components/Modules";
import Recommendation from "@/components/Recommendation";
import { getLoggedInUser } from "@/lib/appwrite";
import { Suspense } from "react";
import Loading from "./loading";

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) return null;
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="grid gap-8">
        <Welcome user={user} />
        <Recommendation user={user} />
        <Suspense fallback={<Loading />}>
          <Modules user={user} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
