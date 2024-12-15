import ModulePreview from "@/components/ModulePreview";
import AddModuleResource from "@/components/AddModuleResource";
import { fetchModuleResources } from "@/utils/module-resource-util";
import { getLoggedInUser } from "@/lib/appwrite";
import { getModule } from "@/utils/module-util";

const YouTubeResourcePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const user = await getLoggedInUser();
  const module: Module | null = await getModule(slug);
  if (!module || !module?.modules) {
    return (
      <div>
        <h1>No module resources</h1>
        <p>Contact admin {user?.email}</p>
      </div>
    );
  }
  if (!slug) return null;

  return (
    <div>
      {user?.name === module.creator ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[400px,1fr]">
            {/* YouTube Resource Form */}
            <AddModuleResource slug={slug} />
            <ModulePreview
              resources={module.modules}
              isEdit={true}
              slug={slug}
            />
          </div>
        </div>
      ) : (
        <h1>Your are not the admin of this page to edit it</h1>
      )}
    </div>
  );
};

export default YouTubeResourcePage;
