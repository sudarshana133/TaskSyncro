import { Account, Client, Databases, Storage } from "node-appwrite";
const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_URL!;
const appwrite_project_id = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const appwrite_key = process.env.NEXT_PUBLIC_APPWRITE_SERVER_API_KEY!;

const adminClient = new Client()
    .setEndpoint(appwrite_endpoint)
    .setProject(appwrite_project_id)
    .setKey(appwrite_key);

const account = new Account(adminClient);
const database = new Databases(adminClient);
const storage = new Storage(adminClient);

export { account, database,storage }