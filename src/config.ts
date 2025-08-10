import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Retrieve a required environment variable.
 * Throws an error if the variable is missing.
 */
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  discordToken: getEnv('DISCORD_TOKEN'),
  clientId: getEnv('CLIENT_ID'),
  databaseUrl: getEnv('DATABASE_URL'),
};

export default config;
