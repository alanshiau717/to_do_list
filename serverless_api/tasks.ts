import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const createTask = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "tasks",
    Item: {
        name: data.name,
        _id: uuid.v1(),
        created: Date.now(),
        due: data.due,
        done: false,
        order: data.order,
        isDeleted: false,
        list: "123",
        user: event.requestContext.identity.cognitoIdentityId
    }
  };
  await dynamoDb.put(params);
  return params.Item;
});



