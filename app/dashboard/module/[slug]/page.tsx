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
  if (!moduleData?.public && moduleData?.creator !== user?.name) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1>This module is not public</h1>
        <p>Please contact the administrator for access.</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex-1 flex items-center mr-4">
            <Timer user={user} />
          </div>

          <h1 className="flex-1 text-2xl md:text-3xl font-bold text-gray-800 text-center truncate px-4">
            {moduleData.title}
          </h1>

          <div className="flex-1 flex justify-end">
            {moduleData?.creator === user?.name && (
              <Button asChild size="sm" className="flex items-center gap-2">
                <Link href={`/dashboard/module/${slug}/edit`}>
                  <Pencil className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <Suspense
                fallback={
                  <div className="animate-pulse">
                    <LoadingState />
                  </div>
                }
              >
                {moduleData?.modules ? (
                  <ResourceRenderer resources={moduleData.modules} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No resources available.</p>
                  </div>
                )}
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 xl:w-1/4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <ModulePreview
                  slug={slug}
                  resources={moduleData.modules}
                  isEdit={false}
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
export default Page;
