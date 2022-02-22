import { Field, ID, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export interface IBaseEntity {
  /**
   * @isInt
   */
  id: number;
  date_created: Date;
  date_updated: Date;
}
@ObjectType()
export class BaseEntity implements IBaseEntity {
  /**
   * Unique Identifier
   */
  @Field(()=> ID)
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * Date of creation
   */
  @Field(()=> Date)
  @CreateDateColumn()
  public date_created: Date;

  /**
   * Date of update
   */
   @Field(()=> Date)
  @UpdateDateColumn()
  public date_updated: Date;
}
