import { Client } from "discord.js";

export interface IUtil {
  client: Client;
  name: string;
}

export class Util implements IUtil {
  public client: Client;
  public name: string;
  constructor(client: Client, util: string) {
    this.client = client;
    this.name = util;
  }
}
