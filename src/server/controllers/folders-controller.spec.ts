global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
import { describeIntegration } from "../../node/test/describe-integration";
import { getTestServer } from "../test/get-test-server";
import { HttpStatusCode } from "../common/http-status-code";
describeIntegration("FoldersController", () => {
    const server= getTestServer();

    // const createTestFolders = async(count: number) => {
    //     const folderRepository = FolderModel

    //     const promises = new Array<Promise<IFolderClientCreate>>();
    //     for (let i = 0; i<count; i++) {
    //         promises.push(
    //             folderRepository.create({
    //                 "name": `Test Folder${i}`,
    //                 "done": true,
    //                 "order": i,
    //                 "user": "Test User"
    //               })
    //         )
    //     }
    //     await Promise.all(promises)
    // }
    describe("CreateUser", () => {
        it("should be able to create new user", async () => {
          const done = true;
          const name = "test folder"
          const user = "test user"
          const order = 1000
    
          await server
            .post("/api/folder")
            .send({ done, name, user, order })
            .expect(HttpStatusCode.OK)
            .expect(({ body: folder }) => {
              expect(folder.done).toEqual(done);
              expect(folder.name).toEqual(name);
              expect(folder.order).toEqual(order);
              expect(folder.user).toEqual(user);
            });
        });
      });

}
    )