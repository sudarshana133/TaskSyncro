import { database } from "@/lib/appwrite-server";
import { Query } from "node-appwrite";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_COLLECTION_ID!;
export const getModules = async (name: string): Promise<Module[]> => {
  if (!name) {
    throw new Error("Name not provided");
  }

  try {
    const documents = await database.listDocuments(database_id, collection_id, [
      Query.equal("creator", name),
    ]);

    const modules: Module[] = documents.documents.map((doc) => ({
      $id: doc.$id,
      title: doc.title,
      description: doc.description,
      creator: doc.creator,
      participants: doc.participants,
      public: doc.public,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      modules: doc.moduleResources
    }));

    if (modules.length === 0) {
      throw new Error("No modules found");
    }

    return modules;
  } catch (error: any) {
    return [];
  }
};
export const deleteModule = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Id is missing for deletion");
    }

    // Perform the deletion
    await database.deleteDocument(database_id, collection_id, id);

    return { message: "Successfully deleted module" };
  } catch (error: any) {
    return { error: error.message || "An error occurred during deletion" };
  }
};
export const getModule = async (slug: string) => {
  try {
    if (!slug) {
      throw new Error("Slug not provided");
    }
    const data = await database.getDocument(database_id, collection_id, slug);
    if (!data) {
      throw new Error("Module not found");
    }
    const module: Module = {
      $id: data.$id,
      title: data.title,
      description: data.description || "",
      creator: data.creator,
      participants: data.participants || [],
      public: data.public,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt || "",
      modules: data.moduleResources.map((resource: ModuleResource) => ({
        $id: resource.$id,
        title: resource.title,
        url: resource.url,
        createdAt: resource.createdAt,
        updatedAt: resource.updatedAt || "",
        moduleId: resource.moduleId,
        type: resource.type as "youtube" | "document",
        fileType: resource.fileType || undefined,
      })),
    };
    return module;
  } catch (error) {
    console.log(error);
    return null;
  }
}