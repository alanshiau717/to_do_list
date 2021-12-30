/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ICreateFolderRequest } from '../models/ICreateFolderRequest';
import type { IFolderClientCreate } from '../models/IFolderClientCreate';
import { request as __request } from '../core/request';

export class FoldersService {

    /**
     * @returns IFolderClientCreate Ok
     * @throws ApiError
     */
    public static async createFolder({
requestBody,
}: {
requestBody: ICreateFolderRequest,
}): Promise<IFolderClientCreate> {
        const result = await __request({
            method: 'POST',
            path: `/folder`,
            body: requestBody,
        });
        return result.body;
    }

}