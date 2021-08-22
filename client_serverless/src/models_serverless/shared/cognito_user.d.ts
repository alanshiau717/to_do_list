export default interface CognitoUser {
    username: string,
    password: string,
    attributes: {
        "custom:firstName": string,
        "custom:lastName": string,
        "custom:inbox": string,
        "custom:default_folder": String
    }
}