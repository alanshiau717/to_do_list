import { Entity, Column, ManyToOne } from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import {User} from "./User"
import {Folder, IFolder} from "./Folder"

export interface IListCreateProps{
    name: string,
    user: number,
    folder: number
}
export interface IList extends IBaseEntity {
    name: string,
    // user: User,
    folder: IFolder
    order: number
    isDeleted: boolean
}

@Entity()
export class List extends BaseEntity implements IList{
    
    @Column()
    name: string;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    done: boolean;
    
    @Column(
        {
            nullable: true,
            default: 0
        }
    )
    order: number;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isDeleted: boolean
    
    @ManyToOne(() => User, user=> user.folders)
    user: User;

    @ManyToOne(()=> Folder, folder=> folder)
    folder: Folder
}

