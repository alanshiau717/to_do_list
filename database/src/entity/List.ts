import { Entity, Column, ManyToOne } from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import {User} from "./User"
import {Folder} from "./Folder"

export interface IListCreateProps{
    name: string,
    user: User,
    folder: Folder
}

export interface IList extends IListCreateProps, IBaseEntity {
    order: number
    isDeleted: boolean
}

@Entity()
export class List extends BaseEntity implements IList{
    
    @Column()
    name: string;

    @Column()
    done: boolean;
    
    @Column()
    order: number;

    @Column()
    isDeleted: boolean
    
    @ManyToOne(() => User, user=> user.folders)
    user: User;

    @ManyToOne(()=> Folder, folder=> folder)
    folder: Folder
}

