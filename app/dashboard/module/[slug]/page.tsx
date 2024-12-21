import ModulePreview from "@/components/ModulePreview";
import { LoadingState, ResourceRenderer } from "@/components/ResourceRenderer";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "@/lib/appwrite";
import { getModule } from "@/utils/module-util";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const user = await getLoggedInUser();
  const moduleData: Module | null = await getModule(slug);
  if (!user) {
    return (
      <div>
        <h1>Ooops looks like you are not logged in</h1>
      </div>
    );
  }
  if (!moduleData || !moduleData?.modules) {
    return (
      <div>
        <h1>No module resources</h1>
        <p>Contact admin {user?.email}</p>
        {moduleData?.creator === user?.name ? (
          <Button asChild>
            <Link
              href={`/dashboard/module/${slug}/edit`}
              className="absolute top-2 right-4"
            >
              Edit <Pencil />
            </Link>
          </Button>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex flex-col lg:flex-row w-full gap-8 mt-6">
        {/* Conditional Rendering of Resource Type */}
        <div className="flex-1 lg:w-2/3 xl:w-3/4">
          <Suspense fallback={<LoadingState />}>
            {moduleData?.modules ? (
              <ResourceRenderer resources={moduleData.modules} />
            ) : (
              <div>No resources available.</div>
            )}
          </Suspense>
        </div>

        {/* Module Preview */}
        <div className="flex-1 lg:w-1/3 xl:w-1/4">
          <ModulePreview
            slug={slug}
            resources={moduleData.modules}
            isEdit={false}
          />
        </div>
      </div>
      <div className="absolute top-2">
        <Timer user={user} />
      </div>
      {moduleData?.creator === user?.name ? (
        <Button asChild>
          <Link
            href={`/dashboard/module/${slug}/edit`}
            className="absolute top-2 right-4"
          >
            Edit <Pencil />
          </Link>
        </Button>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Page;
