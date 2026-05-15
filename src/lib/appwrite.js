import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("sgp-6a0664dc002c48f8bdb4");

const account = new Account(client);
const databases = new Databases(client);

// Production IDs
export const DATABASE_ID = "medlink_db";
export const COLLECTION_REQUESTS = "emergency_requests";
export const COLLECTION_RECORDS = "health_records";

export { client, account, databases };
