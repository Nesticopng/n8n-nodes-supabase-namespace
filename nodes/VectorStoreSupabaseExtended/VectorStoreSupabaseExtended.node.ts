import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	type INodeProperties,
	NodeConnectionType,
} from 'n8n-workflow';

// Campo para seleccionar Schema
const schemaField: INodeProperties = {
	displayName: 'Use Custom Schema',
	name: 'useCustomSchema',
	type: 'boolean',
	default: false,
	noDataExpression: true,
	description: 'Whether to use a database schema different from the default "public" schema',
};

const schemaNameField: INodeProperties = {
	displayName: 'Schema',
	name: 'schema',
	type: 'string',
	default: 'public',
	description: 'Name of database schema to use for table',
	noDataExpression: false,
	displayOptions: { show: { useCustomSchema: [true] } },
};

// Campo para Namespace
const namespaceField: INodeProperties = {
	displayName: 'Namespace',
	name: 'namespace',
	type: 'string',
	default: '',
	description: 'Logical partition for documents. Uses a separate namespace column for filtering.',
};

// Campo para Query Name
const queryNameField: INodeProperties = {
	displayName: 'Query Name',
	name: 'queryName',
	type: 'string',
	default: 'match_documents',
	description: 'Name of the query to use for matching documents',
};

// Campos compartidos (Schema + Table + Namespace)
const sharedFields: INodeProperties[] = [
	schemaField,
	schemaNameField,
	{
		displayName: 'Table Name',
		name: 'tableName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the table in your Supabase database',
	},
	namespaceField,
];

// Campos para inserción
const insertFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			queryNameField,
			{
				displayName: 'Clear Namespace',
				name: 'clearNamespace',
				type: 'boolean',
				default: false,
				description: 'Whether to clear the namespace before inserting new data',
			},
		],
	},
];

// Campos para recuperación
const retrieveFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [queryNameField],
	},
];

export class VectorStoreSupabaseExtended implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Supabase Vector Store Extended',
		name: 'vectorStoreSupabaseExtended',
		icon: 'file:supabase.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Work with your data in Supabase Vector Store with Schema and Namespace support',
		documentationUrl: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabaseextended/',
		defaults: {
			name: 'Supabase Vector Store Extended',
		},
		credentials: [
			{
				name: 'supabaseApi',
				required: true,
			},
		],
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Load',
						value: 'load',
						description: 'Load an existing vector store',
						action: 'Load an existing vector store',
					},
					{
						name: 'Insert',
						value: 'insert',
						description: 'Insert documents into vector store',
						action: 'Insert documents into vector store',
					},
					{
						name: 'Retrieve',
						value: 'retrieve',
						description: 'Retrieve similar documents',
						action: 'Retrieve similar documents',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update documents in vector store',
						action: 'Update documents in vector store',
					},
				],
				default: 'load',
			},
			...sharedFields,
			...insertFields,
			...retrieveFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				switch (operation) {
					case 'load':
						// Implementar operación de carga
						returnData.push({
							json: {
								operation: 'load',
								message: 'Load operation not yet implemented',
								itemIndex: i,
							},
						});
						break;
					case 'insert':
						// Implementar operación de inserción
						returnData.push({
							json: {
								operation: 'insert',
								message: 'Insert operation not yet implemented',
								itemIndex: i,
							},
						});
						break;
					case 'retrieve':
						// Implementar operación de recuperación
						returnData.push({
							json: {
								operation: 'retrieve',
								message: 'Retrieve operation not yet implemented',
								itemIndex: i,
							},
						});
						break;
					case 'update':
						// Implementar operación de actualización
						returnData.push({
							json: {
								operation: 'update',
								message: 'Update operation not yet implemented',
								itemIndex: i,
							},
						});
						break;
					default:
						throw new NodeOperationError(
							this.getNode(),
							`The operation "${operation}" is not supported!`
						);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}