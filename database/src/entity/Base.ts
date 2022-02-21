import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export interface IBaseEntity {
  /**
   * @isInt
   */
  id: number;
  date_created: Date;
  date_updated: Date;
}

export class BaseEntity implements IBaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * Date of creation
   */
  @CreateDateColumn()
  public date_created: Date;

  /**
   * Date of update
   */
  @UpdateDateColumn()
  public date_updated: Date;
}
