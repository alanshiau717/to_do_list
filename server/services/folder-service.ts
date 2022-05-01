// import { throws } from "assert"
// import { FolderDocPopulated,  IFolderClientCreate } from "../../node/mongo/entities/folder"
// import { ICreateFolderRequest } from "../controllers/folders-controller"
// import {ListDoc} from "../../node/mongo/entities/list"
// import { Types } from "mongoose"
// import {FolderRepository} from "../database/repositories/FolderRepository";
// import {InternalServerError} from "../common/internal-server-error"
import { IFolder, IFolderCreateProps } from "../database/entity/Folder";
import { ModifyFolderInput } from "../inputs/FolderInputs";
import { getRepository } from "typeorm";
import {Folder} from "../database/entity/Folder"
import { removeUndefinedKeys } from "../utils/objectUtils";


export class FolderService {
    public async createFolder(request: IFolderCreateProps) : Promise<IFolder> {
        const folder = this.repository.create();
        folder.name = request.name
        folder.userId  = request.user
        return await this.repository.save(folder)

    }
    
    // public async getUserFolders(queryParams, userId) : Promise<IFolder[]> {
    //     console.log("hit get user folders")
    //     // const folders =  await this.repository.find({ ...queryParams, user: userId }).populate({ path: "lists", populate: { path: "tasks" } })
    //     try {
    //     const folders = await this.repository.find({...queryParams, user: userId, relations: ["user"]})
    //     return folders}
    //     catch(err) {
    //         console.log(err.message)
    //         throw new Error("Uncaught Exception")
    //     }
    // }

    public async modifyFolderAndReturnId(userId: number, payload: ModifyFolderInput): Promise<number> {
        const {id, ...modifyFolderProps} = payload
        if(await this.folderBelongsToUser(userId, payload.id)){
            removeUndefinedKeys(modifyFolderProps)
            await this.repository.update({id: id}, {...modifyFolderProps})
            return id
        }
        throw "FOLDER DOESN'T BELONG TO USER"
    }
    

    public async folderBelongsToUser(userId: number, folderId: number){
        const folder = await this.repository.findOne(folderId)
        if(folder){
            if(folder.userId == userId){
                return true
            }
        }
        return false
    }
    //TODO: Remove Test
    public async getAllFolder() {
        const folders = await this.repository.find({relations: ["lists", "user", "lists.tasks", "lists.user"]})
        // console.debug("Get All Folder Folders:", folders)
        // console.debug("Get All Lists", folders[0].lists)
        return folders
    }

    private get repository() {
        return getRepository(Folder);   
    }
}