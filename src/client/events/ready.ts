import { Client, ActivityType } from "discord.js";
import { Event, IEvent } from "../interfaces/event";

export default class ready extends Event implements IEvent {
    constructor(client: any) {
        super(client, "ready", false);
    }

    public async initEvent(client: any) {
        client.utils.logger.log(`Logged in as ${client.user?.tag}`);
        client.user?.setActivity({
            name: "your questions.",
            type: ActivityType.Listening,
        });
    }
}