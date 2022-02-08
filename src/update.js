import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from "@aws-sdk/util-dynamodb";

import handler from './util/handler';
import { client } from './util/dynamodb';

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    await client.send(new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: marshall({
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event.pathParameters.id, // The id of the note from the path
        }),
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: marshall({
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        }),
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW",
    }));

    // Return the retrieved item
    return { status: true };

});