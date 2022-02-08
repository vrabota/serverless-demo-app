import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from "@aws-sdk/util-dynamodb";

import handler from './util/handler';
import { client } from './util/dynamodb';

export const main = handler(async (event) => {
    const result = await client.send(new QueryCommand({
        TableName: process.env.TABLE_NAME,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        KeyConditionExpression: "userId = :userId",
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be the id of the author
        ExpressionAttributeValues: marshall({
            ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
        }),
    }));

    // Return the retrieved item
    return result.Items;

});