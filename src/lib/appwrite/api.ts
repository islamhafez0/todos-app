import { ID, Query } from "appwrite";
import { appWriteConfig, avatars, account, databases } from "./config";

const { databaseId, usersCollectionId } = appWriteConfig;

type UserCreation = {
  email: string;
  password: string;
  name: string;
  username: string;
};

const registerUser = async (user: UserCreation) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error("User creation failed");
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      username: user.username,
    });
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const signInAccount = async (user: { email: string; password: string }) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    if (!session) throw Error("Signin failed");
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

const saveUserToDatabase = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try {
    const savedUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      user
    );
    if (!savedUser) throw Error("Error saving the user to database");
    return savedUser;
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("Error getting the current user account");
    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error("Error getting the current user");
    return currentUser.documents[0] || [];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

const Appwritelogout = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export {
  registerUser,
  signInAccount,
  saveUserToDatabase,
  getCurrentUser,
  Appwritelogout,
};
