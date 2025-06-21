"use server"
import { createAdminClient } from "../appwrite"
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "appwrite";
import { constructFileUrl, parseStringfy } from "../utils";
import { cookies } from "next/headers";




export const uploadFile = async({file} : {file : File }) => {
    const {storage} = await createAdminClient();

    try{
        const inputFile = InputFile.fromBuffer(file, file.name)

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(),inputFile)

        const imageUrl = constructFileUrl(bucketFile.$id);

        return imageUrl;

    }catch(error) {
        console.error("Error uploading file:", error);
        console.log("Error uploading file:", error);
    }


}


export const uploadNewItem  = async(
    {itemName, itemType, itemDescription, coverImage, additionalImages} 
    : {itemName: string, itemType: string, itemDescription: string, coverImage: File , additionalImages: File[] }
) => {
    console.log(coverImage, ' THIS IS THE COVER IMAGE WE GOT');
    if (!(coverImage instanceof File)) {
        throw new Error("coverImage must be a File object");
    }
    console.log(additionalImages, ' THIS IS THE ADDITIONAL IMAGES WE GOT');
    const {databases}  = await createAdminClient();
    const coverImageId = await uploadFile({file: coverImage});
    if (
    !Array.isArray(additionalImages) ||
    !additionalImages.every((file) => file instanceof File)
    ) {
    throw new Error("additionalImages must be an array of File objects");
    }
    const additionalImageIds = await Promise.all(
        additionalImages.map(async (image) => await uploadFile({file: image}))
    );

    const newItem = {
        name : itemName,
        "item-type" : itemType,
        "item-description": itemDescription,
        "cover-image-url": coverImageId,
        "extra-images": additionalImageIds,
    };

    const newFile = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.itemsCollectionId,
        ID.unique(),
        newItem
    );

    return newFile;
}


export const getfiles = async() => {
    const {databases} = await createAdminClient();

    try {
        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.itemsCollectionId
        );

        console.log("Files fetched successfully:", files.documents);
        return files
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
}

export const createAccount = async({fullname,email} : {fullname : string; email : string;}) => {

    const accountId = await sendEmailOTP(email)

    if(!accountId){
        throw new Error("Failed to send OTP")
    }

        const {databases} = await createAdminClient();

        const newuser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name : "test-user",
                email : email,
            }

        )
        return parseStringfy({accountId})
    }



const handleError = (error : unknown, message : string) => {
    console.log(error,message);
    throw error;
}

export const sendEmailOTP = async(email : string) => {
    const {account} = await createAdminClient();

    try{
        const session = await account.createEmailToken(ID.unique(), email);

        return session.userId;
    }catch(error){
        handleError(error , "failed to send email OTP")
    }
}

export const verfiySecret = async({accountId, password} : {accountId : string; password : string}) => {

    try{
        const {account} = await createAdminClient();

        const session = await account.createSession(accountId, password);
        
        (await cookies()).set('appwrite-session', session.secret, {
            path : '/',
            httpOnly : true,
            sameSite : 'strict',
            secure : true
        })
        console.log("this is coookie", )

        console.log(session);
        console.log(session.secret,"this is session secret")

        const cookie = (await cookies()).get('appwrite-session');
        console.log(cookie)

        return parseStringfy({sessionId : session.$id})

    }catch(error){
        console.log(error)
    }
    
}

export const getlatestemail = async() => {

    const {databases} = await createAdminClient();

    try {
        const latestEmail = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
        Query.orderDesc('$sequence'),
        Query.limit(1),
      ]
        );

        if (latestEmail.documents.length > 0) {
            return latestEmail.documents[0].email;
        } else {
            throw new Error("No emails found");
        }
    } catch (error) {
        console.error("Error fetching latest email:", error);
        throw error;
    }
}