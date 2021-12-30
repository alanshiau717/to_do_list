import { Body, Post, Route, Tags } from "tsoa";
import {  IFolderClientCreate } from "../../node/mongo/entities/folder";
import { FolderService } from "../services/folder-service";


export interface ICreateFolderRequest {
    name: String,
    done: boolean,
    order: number,
    user: String,
}

@Route("folder")
export class FolderController {
    @Post()
    @Tags("Folders")
    public async CreateFolder(@Body() request: ICreateFolderRequest): Promise<IFolderClientCreate> {
        return this.service.createFolder(request);

    }

    private get service() {
        return new FolderService
    }
}