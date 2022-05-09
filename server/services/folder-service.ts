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
    public async getAllFolder(userId: number) {
        const folders = await this.repository.find({relations: ["lists", "user", "lists.tasks", "lists.user"], where: {userId: userId}})
        return folders
    }

    private get repository() {
        return getRepository(Folder);   
    }
}