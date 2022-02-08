import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import handler from './util/handler';
import { client } from './util/dynamodb';

export const main = handler(async (event) => {
   const result = await client.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      // 'Key' defines the partition key and sort key of the item to be retrieved
      Key: marshall({
         userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
         noteId: event.pathParameters.id, // The id of the note from the path
      })
   }));

   if (!result.Item) {
      throw new Error("Item not found.");
   }

   // Return the retrieved item
   return unmarshall(result.Item);

});