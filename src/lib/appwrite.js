import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject("6a0664dc002c48f8bdb4");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
