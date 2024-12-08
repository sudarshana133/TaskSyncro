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
    }
}

export { };
