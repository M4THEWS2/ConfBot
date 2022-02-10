"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const readConfig_1 = __importDefault(require("./readConfig"));
const hidden_1 = __importDefault(require("./hidden"));
const client = new discord_js_1.Client({ intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES"] });
client.on("ready", (c) => {
    console.log("I'm ready!");
});
client.on("messageCreate", (msg) => {
    if (msg.author.bot === true) {
        return;
    } // Verifica se a mensagem não é de um bot
    else if (!msg.content.startsWith(readConfig_1.default.prefix)) {
        return;
    }
    ; // Verifica se a mensagem começa com o prefixo
    let commandName = msg.content.split(" ")[0]; // Cria uma variável que contém o comando enviado com o prefixo
    let args = msg.content.split(" "); // Cria variável que contém os parametros do comando
    commandName = commandName.substring(readConfig_1.default.prefix.length, commandName.length).toLowerCase(); // Retira o prefixo do comando
    readConfig_1.default.commands.forEach((command) => {
        if (command.name == commandName) {
            command.functions.forEach(val => {
                try {
                    let commandFunction = require(`./functions/${val.name}`).exec;
                    commandFunction(client, msg, args, val);
                }
                catch (err) {
                    let errembed = new discord_js_1.MessageEmbed()
                        .setTitle("ConfBot Error")
                        .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```");
                    msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro
                    if (readConfig_1.default.printErrOnTerminal) { // Se estiver ativo escreve no terminal o que aconteceu
                        console.log(err);
                    }
                }
            });
        }
    });
});
client.login(hidden_1.default.TOKEN);
