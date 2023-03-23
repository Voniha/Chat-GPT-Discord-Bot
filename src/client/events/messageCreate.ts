import { Event, IEvent } from "../interfaces/event";
import { Message } from "discord.js";

export default class messageCreate extends Event implements IEvent {
  constructor(client: any) {
    super(client, "messageCreate", false);
  }

  public async initEvent(message: any): Promise<void> {
    if (message.author.bot) return;
    if (message.channelId === message.client.config.DISCORD_CHANNEL) {
      await message.channel.sendTyping();
      let messages = Array.from(
        await message.channel.messages.fetch({
          limit: 5,
          before: message.id,
        })
      );
      messages = messages.map((m: any) => m[1]);
      if (messages.length > 0) {
        messages.unshift(message);

        let users = [
          ...new Set([
            ...messages.map((m: any) => m.author.username),
            message.client.user.username,
          ]),
        ];

        let lastUser = users.pop();

        let prompt = `The following is a conversation between ${users.join(
          ", "
        )}, and ${lastUser}. \n\n`;

        for (let i = messages.length - 1; i >= 0; i--) {
          const m: any = messages[i];
          prompt += `${m.author.username}: ${m.content}\n`;
        }
        prompt += `${message.client.user.username}:`;
        const result = await message.client.utils.api.getAnswer(
          message,
          prompt,
          message.content
        );
        await message.reply({
          content: result.data.choices[0].text,
          allowedMentions: { repliedUser: false },
        });
      } else {
        const result = await message.client.utils.api.getAnswer(
          message,
          undefined,
          message.content
        );
        await message.reply({
          content: result.data.choices[0].text,
          allowedMentions: { repliedUser: false },
        });
      }

      message.client.utils.logger.gpt(
        `${message.author.username} asked me a question in ${message.channel.name} in (${message.guild.name})`
      );
    }
  }
}
