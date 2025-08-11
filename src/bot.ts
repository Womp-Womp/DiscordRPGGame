import { Client, GatewayIntentBits, Collection, REST, Routes, Partials } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import config from './config';
import type { Command } from './types';
import { setupRoleSync } from './watchers/roleSync';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.User, Partials.GuildMember],
});
const commands = new Collection<string, Command>();

async function loadCommands(): Promise<void> {
  const commandsPath = path.join(__dirname, 'commands');
  const files = readdirSync(commandsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
  const commandData = [];

  for (const file of files) {
    const filePath = path.join(commandsPath, file);
    const command: Command = (await import(filePath)) as Command;
    commands.set(command.data.name, command);
    commandData.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(config.discordToken);
  await rest.put(Routes.applicationCommands(config.clientId), { body: commandData });
}

async function loadEvents(): Promise<void> {
  const eventsPath = path.join(__dirname, 'events');
  const files = readdirSync(eventsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

  for (const file of files) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
      client.on(event.name, (...args) => event.execute(...args, commands));
    }
  }
}

async function main(): Promise<void> {
  await loadCommands();
  await loadEvents();
  await setupRoleSync(client);
  await client.login(config.discordToken);
}

main().catch(error => {
  console.error('Failed to start bot:', error);
});
