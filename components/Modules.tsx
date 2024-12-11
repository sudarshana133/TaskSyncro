import { FolderOpen } from "lucide-react";
import { getModules } from "@/utils/module-util";
import ModuleCard from "./ModuleCard";
import Link from "next/link";
import { Button } from "./ui/button";

const Modules = async ({ user }: { user: User }) => {
  const modules = await getModules(user.name);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b">
        <FolderOpen className="mr-4 text-blue-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Your Modules</h1>
      </div>

      {modules.length > 0 ? (
        <ModuleCard modules={modules} />
      ) : (
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-12">
          <FolderOpen className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-2xl text-gray-600 mb-2">No modules found</h2>
          <p className="text-gray-500">
            Create your first module to get started
          </p>
          <Button asChild>
            <Link href="/dashboard/module?new=true" className="mt-4">
              Create module
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Modules;
