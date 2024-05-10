import Query from "@/app/search/[query]";
import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.chika.aoratutorial",
  projectId: "663d128d003d7c574f22",
  databaseId: "663d1876000f0a75925f",
  userCollectionId: "663d18b0003387a0dec6",
  videoCollectionId: "663d18eb0028636cf866",
  storageId: "663d1a730004e1343a9a",
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (firstName: string, lastName: string, email: any, password: string): Promise<void> => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            firstName + " " + lastName        
        );

        if (!newAccount) throw new Error("Account not created");
        const avatarUrl = avatars.getInitials(newAccount.firstName, newAccount.lastName);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                firstName,
                lastName,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
};


export const signIn= async (email: any, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error("Account not found");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw new Error("User not found");
        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}