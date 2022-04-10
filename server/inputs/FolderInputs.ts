import { InputType, Field } from "type-graphql";


@InputType()
export class CreateFolderInput {
    @Field()
    name: string;

}

@InputType()
export class ModifyFolderInput {
    @Field()
    id: number

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    order?: number;

    @Field({ nullable: true })
    isDeleted?: boolean;

    @Field({ nullable: true })
    done?: boolean
    
}

