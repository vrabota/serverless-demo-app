import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {

    api; // Public reference to the API

    constructor(scope, id, props) {
        super(scope, id, props);
        const { table } = props;
        this.api = new sst.Api(this, 'Api', {
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                }
            },
            defaultAuthorizationType: 'AWS_IAM',
            routes: {
                'POST /notes': 'src/create.main',
                'GET /notes/{id}': 'src/get.main',
                'GET /notes': 'src/list.main',
                'PUT /notes/{id}': 'src/update.main',
                'DELETE /notes/{id}': 'src/delete.main',
            }
        });
        this.api.attachPermissions([table]); // Allow the API to access the table

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}