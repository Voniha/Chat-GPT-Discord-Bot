import * as dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, APPLICATION_ID, API_KEY, DISCORD_CHANNEL } =  process.env;

if (!DISCORD_TOKEN) throw new Error('Missing DISCORD_TOKEN from .env, get it from https://discord.com/developers/applications');
if (!APPLICATION_ID) throw new Error('Missing APPLICATION_ID from .env, get it from https://discord.com/developers/applications');
if (!API_KEY) throw new Error('Missing API_KEY from .env, get it from https://platform.openai.com/');
if (!DISCORD_CHANNEL) throw new Error('Missing DISCORD_CHANNEL from .env, get it from your Discord server.');


const config: Record<string, string> = {
    DISCORD_TOKEN,
    APPLICATION_ID,
    API_KEY,
    DISCORD_CHANNEL
}

export default config;