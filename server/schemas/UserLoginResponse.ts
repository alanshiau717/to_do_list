import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserLoginResponse {
    @Field(() => String)
    accessToken: string;

    @Field(() => Number)
    defaultFolder: number;

    @Field(()=> Number)
    inbox: number
    
}