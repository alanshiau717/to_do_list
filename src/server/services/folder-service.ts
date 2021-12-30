import { FolderModel,  IFolderClientCreate } from "../../node/mongo/entities/folder"
import { ICreateFolderRequest } from "../controllers/folders-controller"


export class FolderService {
    public async createFolder(request: ICreateFolderRequest) : Promise<IFolderClientCreate> {
        return await this.repository.create(request)}
    

    private get repository() {
        return FolderModel;
    }
}