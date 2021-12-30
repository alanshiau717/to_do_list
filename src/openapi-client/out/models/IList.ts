/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ITask } from './ITask';
import type { Types_ObjectId } from './Types_ObjectId';

export type IList = {
    name: string;
    created: string;
    user: string;
    isDeleted: boolean;
    order: number;
    folder: Types_ObjectId;
    tasks: Array<ITask>;
}