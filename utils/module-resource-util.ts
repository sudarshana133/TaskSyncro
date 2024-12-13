import { database } from "@/lib/appwrite-server";
import { Query } from "appwrite";

const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collection_id = process.env.NEXT_PUBLIC_MODULE_RESOURCES_COLLECTION_ID!;

export async function fetchModuleResources(slug: string): Promise<ModuleResource[]> {
  try {
    const resources = await database.listDocuments(database_id, collection_id, [
      Query.equal("moduleId", slug),
    ]);

    // Map the documents to match the ModuleResource structure
    return resources.documents.map((doc) => ({
      $id: doc.$id,
      title: doc.title || "Untitled Resource",
      url: doc.url || "#",
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
      moduleId: doc.moduleId,
      type: doc.type as "youtube" | "document",
    }));
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

export async function deleteModuleResource(moduleResourceId: string) {
  try {
    await database.deleteDocument(
      database_id,
      collection_id,
      moduleResourceId
    );
    return { success: true, message: "Content deleted from module" };
  } catch (error: any) {
    console.error("Failed to delete resource:", error);
    return {
      success: false,
      error: error.message || "Failed to delete resource"
    };
  }
}