import { Interaction, Collection } from 'discord.js';
import type { Command } from '../types';

export const name = 'interactionCreate';

export async function execute(
  interaction: Interaction,
  commands: Collection<string, Command>
): Promise<void> {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const reply = { content: 'There was an error executing this command!', ephemeral: true } as const;
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
}
