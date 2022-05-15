import { Resolver, Query, Mutation, Arg, Ctx} from "type-graphql";
import { Folder } from "../database/entity/Folder";
import { CreateFolderInput, ModifyFolderInput } from "../inputs/FolderInputs";
import { ModificationResponse } from "../schemas/ModificationResponse";
import { FolderService } from "../services/folder-service";

@Resolver()
export class FolderResolver {
    @Query(() => [Folder])
    async folders(@Ctx() ctx: any) {
        return this.folderService.getAllFolder(ctx.userId)
    }

    @Mutation(() => Folder)
    createFolder(@Arg("data") data: CreateFolderInput, @Ctx() ctx: any) {
        if(!ctx.userId){
            throw "USER NOT AUTHENTICATED"
        }
        return this.folderService.createFolder({
            user: ctx.userId,
            name: data.name
        }
        )
        
    }

    @Mutation(() => ModificationResponse)
    async modifyFolder(@Arg("data") data: ModifyFolderInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        const folderId = await this.folderService.modifyFolderAndReturnId(ctx.userId, data)
        return {id: folderId}
    }

    


    private get folderService() {
        return new FolderService
    }
}