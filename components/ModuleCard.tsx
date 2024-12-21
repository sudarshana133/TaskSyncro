"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FileText, Trash2 } from "lucide-react";
import { deleteModule } from "@/utils/module-util";
import { useEffect } from "react";
import Link from "next/link";

const ModuleCard = ({ modules }: { modules: Module[] }) => {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteModule(id);

      if (res.message) {
        toast({
          title: "Module Deleted",
          description: res.message,
          variant: "default",
          className: "bg-green-400",
        });
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description:
          error.message || "An error occurred while deleting the module.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => (
        <Link href={`/dashboard/module/${module.$id}`} key={index}>
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6 
                    hover:bg-gray-100 hover:border-blue-200 
                    transition duration-300 transform hover:-translate-y-2 
                    hover:shadow-lg hover:cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText className="mr-3 text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  {module.title}
                </h2>
              </div>
              <Trash2
                color="red"
                className="cursor-pointer hover:text-red-700 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(module.$id);
                }}
              />
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {module.description || "No description available"}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(module.createdAt).toLocaleDateString()}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  module.public
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                {module.public ? "Public" : "Private"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ModuleCard;
