import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class SupabaseApi implements ICredentialType {
	name = 'supabaseApi';
	displayName = 'Supabase API';
	documentationUrl = 'https://supabase.com/docs/guides/api';
	properties: INodeProperties[] = [
		{
			displayName: 'Project URL',
			name: 'host',
			type: 'string',
			default: '',
			placeholder: 'https://your-project.supabase.co',
			description: 'The URL of your Supabase project',
			required: true,
		},
		{
			displayName: 'Service Role Key',
			name: 'serviceRole',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'The service role key from your Supabase project (not the anon key)',
			required: true,
		},
	];

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.host }}',
			url: '/rest/v1/',
			method: 'GET',
			headers: {
				'apikey': '={{ $credentials.serviceRole }}',
				'Authorization': 'Bearer {{ $credentials.serviceRole }}',
			},
		},
	};
}
