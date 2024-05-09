import { Client, Account, ID } from "react-native-appwrite";

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

export const createUser = () => {
  account
    .create(ID.unique(), "me@example.com", "password", "John Doe")
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
