import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject("6a0664dc002c48f8bdb4");

const account = new Account(client);
const databases = new Databases(client);

// Production IDs
export const DATABASE_ID = "6a0665b10037a3c3066c"; // Assuming standard IDs or user will create them
export const COLLECTION_REQUESTS = "6a0665ba000d0894e43e";
export const COLLECTION_RECORDS = "health_records";

export { client, account, databases };
