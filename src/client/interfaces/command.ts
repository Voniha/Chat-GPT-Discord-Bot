import {
  CommandInteraction,
  Message
} from "discord.js";
import { Base } from "../index";

export interface ICommand {
  client: Base;
  cooldown?: number;
  description: string;
  name: string;
  memberPermissions: string[];
  clientPermissions: string[];
  options?: any[];
  initInteraction(interaction: CommandInteraction): void;
  initAutocomplete(interaction: CommandInteraction): void;
}
export class Command implements ICommand {
  public client: Base;
  public options?: any[];
  public description: string;
  public cooldown?: number | 5000;
  public memberPermissions: string[];
  public clientPermissions: string[];
  name: any;
  constructor({
    client,
    name,
    description,
    cooldown,
    memberPermissions,
    clientPermissions,
    options,
  }: {
    client: Base;
    name: string;
    description: string;
    cooldown?: number;
    ownerOnly?: boolean | undefined;
    premiumOnly?: boolean | undefined;
    memberPermissions?: string[];
    clientPermissions?: string[];
    options?: any;
  }) {
    this.client = client;
    this.name = name;
    this.cooldown = cooldown || 5000;
    this.description = description;
    this.memberPermissions = memberPermissions || [];
    this.clientPermissions = clientPermissions || [];
    this.options = options || [];
  }
  public initInteraction(interaction: CommandInteraction): void {
    interaction.reply("Komanda trenutno ne radi");
    throw new Error(
      `${this.name} command nema init funkciju za interakciju`
    );
  }

  public initAutocomplete(interaction: CommandInteraction): void {
    throw new Error(
      `${this.name} command nema init funkciju za autocomplete`
    );
  }
  /*public initPrefixCommand(
      message: Message<TextableChannel>,
      args: string[]
    ): void {
      throw new Error(
        `${this.commandOptions.name} command nema init funkciju za prefix komandu`
      );
    }*/
}
