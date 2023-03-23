import { Interaction } from "discord.js";
import { Base } from "../index";

export interface IEvent {
  client: Base;
  name: string;
  once: boolean;
  initEvent(...args: any): void;
}

export class Event implements IEvent {
  public client: Base;
  public name: string;
  public once: boolean;
  constructor(client: Base, name: string, once: boolean) {
    this.client = client;
    this.name = name;
    this.once = once;
  }

  public initEvent(...args: any): void {
    throw new Error("Method not implemented.");
  }
}
