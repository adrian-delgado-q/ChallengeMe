import { loadEnv } from 'vite';

/**
 * Custom Vite plugin to load .env files from a specific directory
 * Supports both folder structure (.env/*.env.mode) and standard files (.env.mode)
 * Only used in local development - skipped in CI/CD environments
 */
function customEnvLoader(envDir: string) {
  return {
    name: 'custom-env-loader',
    config(config: any, { mode }: { mode: string }) {
      // Skip custom env loading in CI/CD environments
      const isCI = process.env.CI || process.env.VERCEL || process.env.NETLIFY;
      
      if (isCI) {
        console.log('CI/CD environment detected, using platform environment variables');
        return;
      }

      console.log(`Loading environment variables for mode: ${mode}`);
      
      // Try to load from the specified directory using Vite's loadEnv
      try {
        const env = loadEnv(mode, envDir, '');
        
        if (Object.keys(env).length === 0) {
          console.warn(`No environment variables found in ${envDir} for mode: ${mode}`);
          return;
        }

        // Merge with existing env variables
        if (!config.define) {
          config.define = {};
        }
        
        // Add environment variables to Vite's define
        Object.keys(env).forEach((key) => {
          if (key.startsWith('VITE_')) {
            config.define[`import.meta.env.${key}`] = JSON.stringify(env[key]);
            console.log(`Loaded: ${key}`);
          }
        });
      } catch (error) {
        console.warn(`Failed to load environment from ${envDir}:`, error);
      }
    }
  };
}

export { customEnvLoader };
