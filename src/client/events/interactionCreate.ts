import { Event, IEvent } from "../interfaces/event";
import { CacheType, Interaction, InteractionType } from "discord.js";

export default class interactionCreate extends Event implements IEvent {
  constructor(client: any) {
    super(client, "interactionCreate", false);
  }

  public async initEvent(interaction: any): Promise<void> {
    if (interaction.type === InteractionType.ApplicationCommand) {
      let command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      // client permissions
      if (command.clientPermissions.length) {
        let channel = interaction.guild?.channels.cache.get(
          interaction.channelId
        );
        let missingPermissions = channel
          ?.permissionsFor(interaction.client.user.id)
          ?.missing(command.clientPermissions);
        if (missingPermissions?.length) {
          return interaction.reply({
            content: `I need the following permissions to run this command: \`${command.clientPermissions.join(
              ", "
            )}\``,
            ephemeral: true,
          }) as any;
        }
      }

      // member permissions
      if (command.memberPermissions.length) {
        let member = interaction.guild?.members.cache.get(interaction.user.id);
        let missingPermissions = member?.permissions.missing(
          command.memberPermissions
        );
        if (missingPermissions?.length) {
          return interaction.reply({
            content: `You need the following permissions to run this command: \`${command.memberPermissions.join(
              ", "
            )}\``,
            ephemeral: true,
          }) as any;
        }
      }

      // cooldown
      if (command.cooldown) {
        let cooldown = interaction.client.cooldowns.get(
          `${interaction.user.id}-${command.name}`
        );
        if (cooldown) {
          let timeLeft = (command.cooldown - (Date.now() - cooldown)) / 1000;
          return interaction.reply({
            content: `Please wait ${timeLeft.toFixed(
              1
            )} more second(s) before reusing the \`${command.name}\` command.`,
            ephemeral: true,
          }) as any;
        } else {
          interaction.client.cooldowns.set(
            `${interaction.user.id}-${command.name}`,
            Date.now()
          );
          setTimeout(() => {
            interaction.client.cooldowns.delete(
              `${interaction.user.id}-${command.name}`
            );
          }, command.cooldown);
        }
      }

      // run command
      try {
        command.initInteraction(interaction);
      } catch (err) {
        console.log(err);
      }
    } else if (
      interaction.type === InteractionType.ApplicationCommandAutocomplete
    ) {
      let command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.initAutocomplete(interaction);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
