import { Resolver, Query, Mutation, Arg, Ctx} from "type-graphql";
import {List} from "../database/entity/List"
// import { ModifyFolderInput } from "../inputs/FolderInputs";
import { CreateListInput, ModifyListInput } from "../inputs/ListInputs";
import { ModificationResponse } from "../schemas/ModificationResponse";
import { ListService } from "../services/list-service";


@Resolver()
export class ListResolver {
    @Query(() => [List])
    async lists() {

    }

    @Mutation(()=> List)
    createList(@Arg("data") data: CreateListInput, @Ctx() ctx: any) {
        if(!ctx.userId){
            throw "USER NOT AUTHENTICATED"
        }
        
        return this.listService.createList({...data, user: ctx.userId})
    }

    private get listService() {
        return new ListService
    }

    @Mutation(() => ModificationResponse)
    async modifyList(@Arg("data") data: ModifyListInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        const listId = await this.listService.modifyListAndReturnId(ctx.userId, data)
        return {id: listId}
    }

}