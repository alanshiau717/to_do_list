import { Body, Get, Post, Route, Tags, Response, Request } from "tsoa";
// import { FolderDocUnpopulated, FolderDocPopulated } from "../../node/mongo/entities/folder";
import { FolderService } from "../services/folder-service";
import {IFolder} from "../database/entity/Folder"
// import { ListPopulated } from "./lists-controller"; 

// export interface FolderPopulated extends Pick<FolderDocPopulated, "name"| "created"| "done" | "order" | "isDeleted" | "user">  {
//     lists: ListPopulated[]
// }

// export type FolderUnpopulated = Pick<FolderDocUnpopulated, "name"| "created"| "done" | "order" | "isDeleted" | "user" | "lists">

interface ErrorResponseModel{
    error: String
}

// export type ICreateFolderRequest = Pick<FolderDocUnpopulated, "name" | "done" | "order" | "user">
import {IFolderCreateProps} from "../database/entity/Folder"

@Route("folder")
export class FolderController {
    @Post()
    @Tags("Folders")
    public async CreateFolder(@Body() request: IFolderCreateProps): Promise<IFolder> {
        return this.service.createFolder(request);
    }
    
    private get service() {
        return new FolderService
    }

    @Get()
    @Response<ErrorResponseModel>(401)
    // @Security("api_key")
    @Tags("Folders")
    public async getFolder(@Request() request: any): Promise<IFolder[]>{
        // console.log(1)
        // const folders = await this.service.getUserFolders(request.body, request.user.userId)
        const folders = await this.service.getUserFolders(request.body, 1)
        return folders
    }


}