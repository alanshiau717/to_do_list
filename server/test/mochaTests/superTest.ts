import request from "supertest"
import {describe} from "mocha"
import createApolloServer from "../../runGraphql"
import { Server } from "http";
// import { doesNotThrow } from "assert";
// import {expect} from "chai"

const queryData = {
    query: `query sayHello($name: String) {
      hello(name: $name)
    }`,
    variables: { name: 'world' },
  };
const url = "localhost:4000"
describe('test demo', () => {
    let server: Server
    before(async () => {
        server = await createApolloServer();

    })
    after(async () => {
        server.close()
    })
    it('says hello', async () => {
        const response = await request(url).post('/').send(queryData)
        console.log(response.body)
    
        // expect(true)
    })
    
})