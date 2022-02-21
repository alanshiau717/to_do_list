// import { throws } from "assert"
// import { FolderDocPopulated,  IFolderClientCreate } from "../../node/mongo/entities/folder"
// import { ICreateFolderRequest } from "../controllers/folders-controller"
// import {ListDoc} from "../../node/mongo/entities/list"
// import { Types } from "mongoose"
import {FolderRepository} from "../database/repositories/FolderRepository";
// import {InternalServerError} from "../common/internal-server-error"
import { IFolder, IFolderCreateProps } from "../database/entity/Folder";



export class FolderService {
    public async createFolder(request: IFolderCreateProps) : Promise<IFolder> {
        // const folder = await this.repository.create(request)
            return await this.repository.create(request)
            // throw new InternalServerError("Internal Server Error")
        }
    
    public async getUserFolders(queryParams, userId) : Promise<IFolder[]> {
        console.log("hit get user folders")
        // const folders =  await this.repository.find({ ...queryParams, user: userId }).populate({ path: "lists", populate: { path: "tasks" } })
        try {
        const folders = await this.repository.find({...queryParams, user: userId, relations: ["user"]})
        return folders}
        catch(err) {
            console.log(err.message)
            throw new Error("Uncaught Exception")
        }
    }
    
    private get repository() {
        return new FolderRepository();   
    }
}