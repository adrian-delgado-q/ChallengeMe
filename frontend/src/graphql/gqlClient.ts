import { GraphQLClient } from 'graphql-request';
import { getAccessToken } from '../supabase/client';

const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const graphQLClient = async () => {
    const accessToken = await getAccessToken();
    return new GraphQLClient(
        `${supabaseUrl}/graphql/v1`,
        {
            headers: {
                apiKey: supabaseKey!,
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export async function executeQuery<T = any>(query: string): Promise<T> {
    const client = await graphQLClient();
    return await client.request<T>(query);
}
