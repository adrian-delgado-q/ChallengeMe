import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: `http://${process.env.GRAPHQL_HTTP_HOST}:${process.env.GRAPHQL_HTTP_PORT}/graphql`,
	documents: 'src/graphql/definitions/**/*.graphql',
	generates: {
		'src/graphql/generated/graphql.ts': {
			plugins: ['typescript'],
			config: {
				scalars: {
					Date: 'string',
				},
			},
		},
		'src/graphql/': {
			preset: 'near-operation-file',
			presetConfig: {
				extension: '.generated.ts',
				baseTypesPath: './generated/graphql.ts',
			},
			plugins: [
				{ add: { content: '// THIS FILE IS GENERATED, DO NOT EDIT!' } },
				'typescript-operations',
				'typescript-react-query',
			],
			config: {
				dedupeFragments: true,
				scalars: {
					Date: 'string',
				},
				useTypeImports: true,
				legacyMode: false,
				reactQueryVersion: 5,
			},
		},
	},
	config: {
		namingConvention: {
			transformUnderscore: true,
		},
		skipTypename: false,
		enumsAsTypes: true,
		avoidOptionals: false,
		maybeValue: 'T | null',
	},
};
export default config;
