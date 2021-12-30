/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IList } from '../models/IList';
import { request as __request } from '../core/request';

export class ListsService {

    /**
     * @returns IList Ok
     * @throws ApiError
     */
    public static async getUsers(): Promise<Array<IList>> {
        const result = await __request({
            method: 'GET',
            path: `/list`,
        });
        return result.body;
    }

}