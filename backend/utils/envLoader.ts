import dotenv from 'dotenv';
import path from 'path';

export default function loadEnvironmentVariables() {
    const backendRoot = path.resolve(__dirname, '../..');
    let envFile = '';
    if (process.env.NODE_ENV === 'development') {
        envFile = path.join(backendRoot, '.env/.env.development');
    } else if (process.env.NODE_ENV === 'production') {
        envFile = path.join(backendRoot, '.env/.env.production');
    }
    if (envFile) {
        const result = dotenv.config({ path: envFile });
        console.log(`Loaded environment variables from ${envFile}`);
        if (result.error) {
            console.error('Error loading .env file:', result.error);
        }
    } else {
        console.warn('No .env file loaded, unknown NODE_ENV:', process.env.NODE_ENV);
    }
}
