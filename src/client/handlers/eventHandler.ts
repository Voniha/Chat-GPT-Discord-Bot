import { Client } from "discord.js";
import { readdirSync, readFileSync } from "fs";
export function loadEvents(client: any) {
    let eventFiles = readdirSync("./dist/client/events").filter(file => file.endsWith(".js"));
    for (let file of eventFiles) {
        let event = require(`../../../dist/client/events/${file}`).default;
        let eventName = new event();
        client.on(eventName.name, (...args: any) => eventName.initEvent(...args));
    }

    client.utils.logger.log(`Loaded ${eventFiles.length} events`);
}