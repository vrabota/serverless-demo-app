import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from "@aws-sdk/util-dynamodb";

import handler from './util/handler';
import { client } from './util/dynamodb';

export const main = handler(async (event) => {
    await client.send(new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: marshall({
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event.pathParameters.id, // The id of the note from the path
        }),
    }));

    // Return the retrieved item
    return { status: true };

});