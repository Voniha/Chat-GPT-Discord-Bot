import { IUtil, Util } from "../interfaces/util";
const chalk = require("chalk");

export default class Logger extends Util implements IUtil {
    constructor(client: any) {
        super(client, "logger");
    }

     public log(message: string) {
        return console.log(
            chalk.white(`[`) +
            chalk.blue(`LOG`) +
            chalk.white(`]`) +
            chalk.blue(` - `) +
            chalk.white(message)
        );
    }

    public error(message: string) {
        return console.log(
            chalk.white(`[`) +
            chalk.red(`ERROR`) +
            chalk.white(`]`) +
            chalk.red(` - `) +
            chalk.white(message)
        );
    }

    public gpt(message: string) {
        return console.log(
            chalk.white(`[`) +
            chalk.green(`GPT`) +
            chalk.white(`]`) +
            chalk.green(` - `) +
            chalk.white(message)
        );
    }
}