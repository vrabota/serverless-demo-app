import { v1 as uuidv1 } from 'uuid';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { client } from './util/dynamodb';
import handler from './util/handler';

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
        noteId: uuidv1(),
        content: data.content,
        attachment: data.attachment || '',
        createdAt: Date.now(),
    };
    await client.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(params || {})
    }));
    return params;
})