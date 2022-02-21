import { IList, IListCreateProps, List } from "../entity/List";
import { BaseRepository } from "./BaseRepository";

export class ListRepository extends BaseRepository<IList, List, IListCreateProps> {
    constructor(){
        super(List)
    }
}