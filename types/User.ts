declare global {
    interface User {
        $id: string;
        name: string;
        email: string;
        points?: number;
        role?: "User" | "Admin";
        avatar?: string;
    }
}

export { };
