import { Client, IntentsBitField, Collection } from "discord.js";
import config from "../config/config";
import { ICommand } from "./interfaces/command";
import { loadCommands } from "./handlers/commandHandler";
import { loadEvents } from "./handlers/eventHandler";
import { loadUtils } from "./handlers/utilHandler";
import { Configuration, OpenAIApi } from "openai";


interface IBase {
  commands: Map<string, ICommand>;
  prefix: string;
  config: any;
  cooldown: Map<string, number>;
  utils: any;
}

export class Base extends Client implements IBase {
  public commands: Collection<string, any> = new Collection();
  public events: Collection<string, any> = new Collection();
  public utils: any = {};
  public aliases: Collection<string, any> = new Collection();
  public cooldown: Map<string, number> = new Map();
  public prefix: string = config.prefix;
  public config: any = config;
  public cooldowns: Map<string, number> = new Map();
  public openaiconfig = new Configuration({
    apiKey: config.API_KEY,
  });
  public openai = new OpenAIApi(this.openaiconfig);
  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });

    require("./handlers/erorrHandler")(this);
  }
  public async start() {
    await loadUtils(this);
    await loadCommands(this);
    await loadEvents(this);
    await this.login(config.token);
  }
}
