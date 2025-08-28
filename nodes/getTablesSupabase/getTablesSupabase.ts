import { ApplicationError, type IDataObject, type ILoadOptionsFunctions } from 'n8n-workflow';

// TODO: Add other vector stores
export async function supabaseTableNameSearch(this: ILoadOptionsFunctions) {
	const credentials = await this.getCredentials('supabaseApi');

	const results = [];

	if (typeof credentials.host !== 'string') {
		throw new ApplicationError('Expected Supabase credentials host to be a string');
	}

	const { paths } = (await this.helpers.requestWithAuthentication.call(this, 'supabaseApi', {
		headers: {
			Prefer: 'return=representation',
		},
		method: 'GET',
		uri: `${credentials.host}/rest/v1/`,
		json: true,
	})) as { paths: IDataObject };

	for (const path of Object.keys(paths)) {
		//omit introspection path
		if (path === '/') continue;

		results.push({
			name: path.replace('/', ''),
			value: path.replace('/', ''),
		});
	}

	return { results };
}