import { GraphQLClient } from 'graphql-request';
import { getAccessToken } from '../supabase/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

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
