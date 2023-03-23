import { Client } from "discord.js";
import { readdirSync, readFileSync } from "fs";

export function loadUtils(client: any) {
    let utilFiles = readdirSync("./dist/client/utils").filter((file: any) => file.endsWith(".js"));
    for (let file of utilFiles) {
        let util = require(`../../../dist/client/utils/${file}`).default;
        let utl = new util();
        client.utils[utl.name] = utl;
    }

    client.utils.logger.log(`Loaded ${utilFiles.length} utils`)
}