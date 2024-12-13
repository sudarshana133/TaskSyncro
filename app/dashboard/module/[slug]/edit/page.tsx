import ModulePreview from "@/components/ModulePreview";
import AddModuleResource from "@/components/AddModuleResource";
import { fetchModuleResources } from "@/utils/module-resource-util";

const YouTubeResourcePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const resources = await fetchModuleResources(slug);

  if (!slug) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[400px,1fr]">
        {/* YouTube Resource Form */}
        <AddModuleResource slug={slug} />
        <ModulePreview resources={resources} isEdit={true} slug={slug} />
      </div>
    </div>
  );
};

export default YouTubeResourcePage;
