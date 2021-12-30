// let assert = require('assert');
import assert from "assert"
import { getTestServer } from "../get-test-server"
import {describe} from "mocha"
import {expect} from "chai"
import { HttpStatusCode } from "../../common/http-status-code"
// import connectToDB from "../../../node/mongo/get-db-connection"
describe("FolderControllerTest", () => {
  const server = getTestServer()
  // connectToDB()
  describe("POST /", () => {
    it("should create valid folder", (complete) => {
      const done = true;
      const name = "test folder name 123"
      const user = "test user"
      const order = 1000
      server
        .post("/api/folder")
        .send({ done, name, user, order })
        .expect(HttpStatusCode.OK)
        .expect(({ body: folder }) => {
          expect(folder.done).to.equal(done)
          expect(folder.name).to.equal(name);
          expect(folder.user).to.equal(user);
          expect(folder.order).to.equal(order);
        })
        .end(function(err){
          if(err){ 
          complete(err)}
            else{
              complete()
            }
        })
      it("should fail on invalid folder", (complete) => {
        const name = "test folder name 123"
        const user = "test user"
        const order = 1000
        server
          .post("/api/folder")
          .send({ done, name, user, order })
      })
    } )
  })
})
