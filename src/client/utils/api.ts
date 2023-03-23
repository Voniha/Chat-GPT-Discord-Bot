import { Util, IUtil } from "../interfaces/util";
const chalk = require("chalk");

export default class API extends Util implements IUtil {
  constructor(client: any) {
    super(client, "api");
  }

  public async getAnswer(interaction: any, prompt: any, question: string) {
    let result = await interaction.client.openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 500,
      stop: ["\n"],
      prompt: prompt ? prompt : `The following is a conversation between you and ${interaction.client.user.username}. \n\nYou: ${question}\n${interaction.client.user.username}:`,
    });

    return result;
  }
}
