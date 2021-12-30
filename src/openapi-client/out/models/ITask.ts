/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Types_ObjectId } from './Types_ObjectId';

export type ITask = {
    name: string;
    created: string;
    due?: string;
    done: boolean;
    order: number;
    isDeleted: boolean;
    user: string;
    list: Types_ObjectId;
}