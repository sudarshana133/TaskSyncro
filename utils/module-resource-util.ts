import { database, storage } from "@/lib/appwrite-server";
import { ID, ImageFormat, ImageGravity } from "node-appwrite";
import { Query } from "appwrite";

export const database_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const bucket_id = process.env.NEXT_PUBLIC_BUCKET_ID!;
export const collection_id = process.env.NEXT_PUBLIC_MODULE_RESOURCES_COLLECTION_ID!;

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
      fileType: doc.fileType || "video"
    }));
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

export async function deleteModuleResource(moduleResourceId: string, url?: string) {
  try {
    await database.deleteDocument(
      database_id,
      collection_id,
      moduleResourceId
    );
    if (url) {
      await storage.deleteFile(
        bucket_id,
        url
      );
    }
    return { success: true, message: "Content deleted from module" };
  } catch (error: any) {
    console.error("Failed to delete resource:", error);
    return {
      success: false,
      error: error.message || "Failed to delete resource"
    };
  }
}


export async function addDoc(slug: string, file: File, title: string) {
  try {
    // Validate inputs
    if (!file || !title) {
      throw new Error("Missing file or title");
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size must be under 10MB");
    }

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Allowed type: PDF"
      );
    }

    // Upload file to Appwrite storage
    const storageFile = await storage.createFile(
      bucket_id, // Appwrite storage bucket ID
      ID.unique(),
      file
    );

    // Create document record in database
    const documentData = {
      moduleId: slug,
      type: "document",
      url: storageFile.$id,
      title,
      fileType: file.type,
      createdAt: new Date().toISOString(),
      module: slug,
    };

    const databaseRecord = await database.createDocument(
      database_id,
      collection_id,
      ID.unique(),
      documentData
    );

    return {
      message: "Document uploaded successfully",
    };
  } catch (error: any) {
    console.log("Error uploading document:", error);
    throw new Error(error.message || "Failed to upload document");
  }
}
export const getPDFArrayBuffer = async (fileId: string): Promise<ArrayBuffer> => {
  try {
    const result = await storage.getFileView(
      bucket_id,
      fileId
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow or handle the error appropriately
  }
};