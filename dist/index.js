"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const client = new Discord.Client({
    intents: [
        "GuildMessages",
        "MessageContent",
        "Guilds",
        "GuildBans",
        "GuildMembers",
    ],
});
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/config.json"), "utf8"));
const commands = new Discord.Collection();
config.commands.forEach((command) => {
    commands.set(command.name, command.functions);
});
const functions = new Discord.Collection();
fs.readdirSync(path.join(__dirname, "./functions")).forEach((file) => {
    const func = require(`./functions/${file}`);
    functions.set(func.func_name, func.func);
});
const log = fs.createWriteStream(path.join(__dirname, "../logs.log"), {
    flags: "a",
    encoding: "utf-8",
});
client.on("ready", () => {
    console.log("Your Bot is now online!");
});
client.on("messageCreate", (message) => {
    var _a, _b;
    if (message.author.bot)
        return;
    if (!message.content.startsWith(config.prefix))
        return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = ((_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "No command";
    if (commands.has(command)) {
        let count = 1;
        (_b = commands.get(command)) === null || _b === void 0 ? void 0 : _b.forEach((func) => {
            var _a, _b, _c;
            if (functions.has(func.name)) {
                (_a = functions.get(func.name)) === null || _a === void 0 ? void 0 : _a(message, args, func);
                log.write(`[${message.author.tag}] (${message.author.id}) ran the function [${func.name}] (for the ${count} time) with the command [${command}] at ${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.name} (${(_c = message.guild) === null || _c === void 0 ? void 0 : _c.id}). ---> ${new Date().toLocaleString()}\n`);
                count += 1;
            }
            else {
                console.error(`\nERROR:\n---*Function ${func.name} does not exist.*---`);
                message.reply("An internal error has occured.");
            }
        });
    }
    else {
        message.reply(`Command ${command} does not exist.`);
    }
});
client.login(config.token);
