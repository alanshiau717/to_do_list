import { IFolder, IFolderCreateProps, Folder } from "../entity/Folder";
import { BaseRepository } from "./BaseRepository";

export class FolderRepository extends BaseRepository<IFolder, Folder, IFolderCreateProps> {
    constructor(){
        super(Folder)
    }
}