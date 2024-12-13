import ModulePreview from "@/components/ModulePreview";
import { LoadingState, ResourceRenderer } from "@/components/ResourceRenderer";
import { Button } from "@/components/ui/button";
import {
  deleteModuleResource,
  fetchModuleResources,
} from "@/utils/module-resource-util";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const resources = await fetchModuleResources(slug);
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex flex-col lg:flex-row w-full gap-8 mt-6">
        {/* Conditional Rendering of Resource Type */}
        <div className="flex-1 lg:w-2/3">
          <Suspense fallback={<LoadingState />}>
            <ResourceRenderer resources={resources} />
          </Suspense>
        </div>

        {/* Module Preview */}
        <div className="flex-1 lg:w-1/3">
          <ModulePreview slug={slug} resources={resources} isEdit={false} />
        </div>
      </div>
      <Button asChild>
        <Link
          href={`/dashboard/module/${slug}/edit`}
          className="absolute top-2 right-4"
        >
          Edit <Pencil />
        </Link>
      </Button>
    </div>
  );
};
export default Page;
