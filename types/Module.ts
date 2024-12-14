declare global {
    interface Module {
        $id: string;
        title: string;
        description: string;
        creator: string;
        participants: string[];
        public: boolean;
        createdAt: string;
        updatedAt: string;
        modules: ModuleResource[];
    }
    interface ModuleResource {
        $id: string;
        title: string;
        url: string;
        createdAt: string;
        updatedAt: string;
        moduleId: string;
        type: "youtube" | "document";
        fileType?: string;
    }
}

export { };
