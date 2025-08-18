import type { INodeProperties, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { contactFields, contactNotes, contactOperations } from './description/ContactDescription';
import { opportunityFields, opportunityOperations } from './description/OpportunityDescription';
import { taskFields, taskOperations } from './description/TaskDescription';
import {
	getPipelineStages,
	getTimezones,
	getUsers,
	highLevelApiPagination,
} from './GenericFunctions';

const ressources: INodeProperties[] = [
    {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Contact',
                value: 'contact',
            },
            {
                name: 'Opportunity',
                value: 'opportunity',
            },
            {
                name: 'Task',
                value: 'task',
            },
        ],
        default: 'contact',
        required: true,
    },
];

export class FullFunnel implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'FullFunnel',
        name: 'fullfunnel',
        icon: 'file:funil.svg',
        group: ['transform'],
        version: 1,
        description: 'Consume FullFunnel API',
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        defaults: {
            name: 'FullFunnel',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'fullFunnelApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://rest.gohighlevel.com/v1',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        requestOperations: {
            pagination: highLevelApiPagination,
        },
        properties: [
            ...ressources,
			...contactOperations,
			...contactNotes,
			...contactFields,
			...opportunityOperations,
			...opportunityFields,
			...taskOperations,
			...taskFields,
        ],
    };

    methods = {
        loadOptions: {
            getPipelineStages,
            getUsers,
            getTimezones,
        }
    }
}