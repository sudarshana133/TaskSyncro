import { account, database, ID } from "./appwrite"

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const user = await account.create(ID.unique(), email, password, username);
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