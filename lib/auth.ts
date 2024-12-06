import {  OAuthProvider, Query } from "appwrite"
import { account,database,ID } from "./appwrite"


export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(
            OAuthProvider.Google,
            'http://localhost:3000/dashboard', // redirect here on success
            'http://localhost:3000/error',
        );

        const user:User = await account.get();

        const existingUser = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
            [
                Query.equal("email", user.email),
            ]
        );
        console.log(existingUser);
        if (existingUser.documents.length > 0) {
            window.location.href = "/dashboard";
        } else {
            const userDoc = await database.createDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
                user.$id,
                {
                    username: user.name || "unknown",
                    email: user.email || "unknown",
                    avatar: user.avatar || "",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }
            );
            console.log("New user document created:", userDoc);
            window.location.href = "/dashboard";
        }
    } catch (error) {
        console.log("Error during Google login/signup:", error);
    }
};

export const registerUser = async (username:string,email: string, password: string) => {
    try {
        const user = await account.create(ID.unique(),email,password,username);
        const userDoc = await database.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
            user.$id,
            {
                username: username,
                email,
                role: "User",
                points: 0,
                avatar: "",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
        );
        return user;
    } catch (error) {
        throw error;
    }
}
export const loginUser = async (email: string, password: string) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (error) {
       throw error;
    }
};

// Logout
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Logout error:', error);
    }
};