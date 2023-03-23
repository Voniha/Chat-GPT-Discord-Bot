import { Base } from "../index";
import { Client, REST, Routes } from "discord.js";
import { readdirSync, readFileSync } from "fs";
export async function loadCommands(client: Base) {
    let array = [];
    let dirFiles = readdirSync("./dist/client/commands");
    for (let dir of dirFiles) {
        let dirFile = readdirSync(`./dist/client/commands/${dir}`);
        for (let command of dirFile) {
            let cmd = require(`../../../dist/client/commands/${dir}/${command}`).default;
            let constructor = new cmd()
            array.push(constructor);
            client.commands.set(constructor.name, constructor);
        }
    }
    let rest = new REST({ version: "10" }).setToken(client.config.DISCORD_TOKEN);
    await rest.put(Routes.applicationCommands(client.config.APPLICATION_ID), { body: array });
    client.utils.logger.log(`Loaded ${client.commands.size} commands`);
}