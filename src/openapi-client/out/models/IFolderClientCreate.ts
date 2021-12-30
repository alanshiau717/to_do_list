/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Types_ObjectId } from './Types_ObjectId';

export type IFolderClientCreate = {
    name: string;
    created: string;
    done: boolean;
    order: number;
    isDeleted: boolean;
    user: string;
    _id: Types_ObjectId;
    lists: Array<Types_ObjectId>;
}