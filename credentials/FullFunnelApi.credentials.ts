import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FullFunnelApi implements ICredentialType {
	name = 'fullFunnelApi';

	displayName = 'FullFunnel API';

	documentationUrl = 'https://docs.n8n.io/integrations/custom-api/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://rest.gohighlevel.com/v1',
			url: '/custom-values/',
		},
	};
}
