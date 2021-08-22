import * as uuid from "uuid";
// import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


export const postConfirmation = async (event, context, callback) => {
    console.log(event)
    // const data = JSON.parse(event.body);
    const folderId = uuid.v1()
    const folderParams = {
        TableName: "folders",
        Item: {
            _id: folderId,
            name: "default",
            order: 1,
            user: event.requestContext.identity.cognitoIdentityId,
            lists: [],
        }
    }
    const listParams = {
        TableName: "lists",
        Item: {
            _id: uuid.v1(),
            name: "Inbox",
            order: 1,
            user: event.requestContext.identity.cognitoIdentityId,
            lists: [],
            folder: folderId

        }
    }
    await dynamoDb.put(folderParams);
    await dynamoDb.put(listParams)
    callback(null, event);
  };