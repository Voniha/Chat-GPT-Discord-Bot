import { Command, ICommand } from "../../interfaces/command";


export default class PingCommand extends Command implements ICommand  {
    constructor(client: any) {
        super({
            client: client,
            name: "ping",
            description: "Ping pong",
            cooldown: 5000,
            memberPermissions: [],
            clientPermissions: ["SendMessages"],
            options: []
        });
    }

    public async initInteraction(interaction: any) {
       await interaction.reply("Pong!");
    }
}