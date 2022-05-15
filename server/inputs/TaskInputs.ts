import {InputType, Field} from "type-graphql"

@InputType()
export class CreateTaskInput {
    @Field()
    name: string

    @Field()
    list: number
}

@InputType()
export class ModifyTaskInput {
    @Field()
    id: number

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    due?: Date;

    @Field({ nullable: true })
    order?: number
    
    @Field({ nullable: true })
    isDeleted?: boolean

    @Field({ nullable: true })
    listId?: number

    @Field({ nullable: true })
    done?: boolean 
    
}