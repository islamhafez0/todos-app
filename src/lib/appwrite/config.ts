import { Account, Avatars, Client, Databases } from "appwrite";
const appWriteConfig = {
  apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  endPointUrl: import.meta.env.VITE_APPWRITE_ENDPOINT_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  usersCollectionId: import.meta.env.VITE_USERS_COLLECTION_ID,
};
const client = new Client();

client
  .setEndpoint(appWriteConfig.endPointUrl)
  .setProject(appWriteConfig.projectId);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { appWriteConfig, account, avatars, databases };
