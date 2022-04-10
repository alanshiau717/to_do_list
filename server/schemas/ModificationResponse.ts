import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ModificationResponse {
    @Field(() => Number)
    id: number;
}