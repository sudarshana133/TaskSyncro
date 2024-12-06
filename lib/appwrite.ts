import { Client, Account, Databases,ID } from "appwrite";

export const appwrite_endpoint = String(process.env.NEXT_PUBLIC_APPWRITE_URL);
export const appwrite_project_id = String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
const client = new Client().setEndpoint(appwrite_endpoint).setProject(appwrite_project_id);

const account = new Account(client);
const database = new Databases(client);

export { client, account, database,ID };