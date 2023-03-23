import { Command, ICommand } from "../../interfaces/command";

export default class AskCommand extends Command implements ICommand {
  constructor(client: any) {
    super({
      client: client,
      name: "ask-me",
      description: "Ask me anything!",
      cooldown: 5000,
      memberPermissions: ["SendMessages"],
      clientPermissions: [
        "SendMessages",
        "EmbedLinks",
        "UseExternalEmojis",
        "ViewChannel",
      ],
      options: [
        {
          name: "question",
          description: "The question you want to ask me",
          type: 3,
          required: true,
        },
        {
          name: "answer",
          description: "The answer to your question",
          type: 3,
          required: false,
          autocomplete: true,
        },
      ],
    });
  }
  public async initAutocomplete(interaction: any) {
    let question = interaction.options.get("question")?.value;
    let result = await interaction.client.utils.api.getAnswer(
      interaction,
      undefined,
      question
    );
    let choices = result.data.choices.map((choice: any, index: Number) => {
      return {
        name: `answer-${index}`,
        value: choice.text.slice(0, 100).trim(),
      };
    });
    await interaction.respond(choices);
  }
  public async initInteraction(interaction: any) {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    let question = interaction.options.get("question")?.value;
    let answer = interaction.options._hoistedOptions[1]?.value;
    if (!answer) {
      let result = await interaction.client.utils.api.getAnswer(
        interaction,
        undefined,
        question
      );
      await interaction.editReply({
        content: result.data.choices[0].text ? result.data.choices[0].text.trim() : "I don't know",
        ephemeral: true,
      });
      interaction.client.utils.logger.gpt(
        `${interaction.user.username} asked me a question in ${interaction.channel.name} in (${interaction.guild.name}) by using the slash command`
      );
    } else if (answer) {
      await interaction.editReply({
        content: answer ? answer.trim() : "I don't know",
        ephemeral: true,
      });

      interaction.client.utils.logger.gpt(
        `${interaction.user.username} asked me a question in ${interaction.channel.name} in (${interaction.guild.name}) by using the slash command`
      );
    }
  }
}
