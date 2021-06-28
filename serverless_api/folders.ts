import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


export const createFolder = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "folders",
      Item: {
          name: data.name,
          _id: uuid.v1(),
          created: Date.now(),
          done: false,
          order: data.order,
          isDeleted: false,
          user: event.requestContext.identity.cognitoIdentityId
      }
    };
    await dynamoDb.put(params); 
    return params.Item;
  });

export const getFolder = handler(async (event, context) => {
    const params = {
        TableName: "folders",
        Key: {
            user: "123",
            ... event.pathParameters
        }
    }
    const result = await dynamoDb.get(params);
    if (!result.Item) {
      throw new Error("Item not found.");
    }
    return result.Item;
})



export const deleteFolder = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.tableName,
      // 'Key' defines the partition key and sort key of the item to be updated
      Key: {
        userId: "123", // The id of the author
        _id: event.pathParameters.folderId, // The id of the note from the path
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET isDeleted = :isDeleted",
      ExpressionAttributeValues: {
        ":isDeleted": true,
      },
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update; you
      // can inspect 'result' below to see how it works with different settings
      ReturnValues: "ALL_NEW",
    };
  
    await dynamoDb.update(params);
  
    return { status: true };
  });