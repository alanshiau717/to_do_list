import { InputType, Field } from "type-graphql";


@InputType()
export class CreateListInput {
    @Field()
    name: string

    @Field()
    folder: number
}

@InputType()
export class ModifyListInput {
    @Field()
    id: number

    @Field({ nullable: true })
    folderId?: number

    @Field({ nullable: true })
    done?: boolean

    @Field({ nullable: true })
    order?: number

    @Field({ nullable: true })
    isDeleted?: boolean

    @Field({ nullable: true })
    name?: string
}

