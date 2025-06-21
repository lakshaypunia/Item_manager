"use server"
import { Account, Client, Databases, Storage } from "appwrite"
import { appwriteConfig } from "./config"



export const createAdminClient = async() => {
        const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId)
        .setDevKey(appwriteConfig.secretKey)

    
    return {
        get databases(){
            return new Databases(client)
        },
        get storage(){
            return new Storage(client)
        },
        get account(){
            return new Account(client)
        }
    }
}

 