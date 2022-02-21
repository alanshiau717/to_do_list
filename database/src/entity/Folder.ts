import { Entity, Column,  ManyToOne, OneToMany } from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import { List } from "./List";
import {User} from "./User"

export interface IFolderCreateProps{
    name: string,
    user: User
}

export interface IFolder extends IFolderCreateProps, IBaseEntity {
    order: number
    isDeleted: boolean
}

@Entity()
export class Folder extends BaseEntity{
    
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

    @OneToMany(() => List, list=> list.folder)
    lists: List[];
}

