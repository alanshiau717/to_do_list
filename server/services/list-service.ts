import { getRepository } from "typeorm";
import { IListCreateProps } from "../database/entity/List";
import { List } from "../database/entity/List";
import { ModifyListInput } from "../inputs/ListInputs";
import { removeUndefinedKeys } from "../utils/objectUtils";
import { FolderService } from "./folder-service";


export class ListService {

    public async createList(request: IListCreateProps): Promise<List> {
        if (await this.folderService.folderBelongsToUser(request.user, request.folder)) {
            let list = this.repository.create();
            list.folderId = request.folder
            list.name = request.name
            list.userId = request.user
            return await this.repository.save(list)
        }
        throw "INTERNAL SERVER ERROR"
    }

    public async listBelongsToUser(userId: number, listId: number) {
        const list = await this.repository.findOne(listId)
        if (list) {
            if (list.userId == userId) {
                return true
            }
        }
        return false
    }

    public async modifyListAndReturnId(userId: number, payload: ModifyListInput) {
        const { id, ...modifyListProps } = payload
        if ((await this.listBelongsToUser(userId, id) && (await this.isValidListModification(userId, payload)))

        ) {
            removeUndefinedKeys(modifyListProps)
            await this.repository.update({ id: id }, { ...modifyListProps })
            return id
        }
        throw "LIST DOESN'T BELONG TO USER"
    }
    
    private async isValidListModification(userId: number, payload: ModifyListInput) {
        if(payload.folderId){
            return await this.folderService.folderBelongsToUser(userId, payload.folderId) 
        }
        return true
    }


    private get repository() {
        return getRepository(List)
    }
    private get folderService() {
        return new FolderService();
    }
    
}