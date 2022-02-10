import { Client, MessageEmbed } from "discord.js";
import config from "./readConfig"
import hidden from "./hidden";

const client = new Client({ intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES"] });

interface commandInterface {
    name: string;
    functions: Array<any>;
}

client.on("ready", (c) => {
    console.log("I'm ready!");
})

client.on("messageCreate", (msg) => {
    if (msg.author.bot === true) { return } // Verifica se a mensagem não é de um bot
    else if (!msg.content.startsWith(config.prefix)) { return }; // Verifica se a mensagem começa com o prefixo

    let commandName = msg.content.split(" ")[0]; // Cria uma variável que contém o comando enviado com o prefixo
    let args = msg.content.split(" "); // Cria variável que contém os parametros do comando
    commandName = commandName.substring(config.prefix.length, commandName.length).toLowerCase(); // Retira o prefixo do comando
    
    config.commands.forEach((command: commandInterface) => {
        if (command.name == commandName) {
            command.functions.forEach(val => {
                try {
                    let commandFunction = require(`./functions/${val.name}`).exec;
                    commandFunction(client, msg, args, val);
                } catch (err) {
                    let errembed = new MessageEmbed()
                        .setTitle("ConfBot Error")
                        .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```");
                    msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro

                    if (config.printErrOnTerminal) { // Se estiver ativo escreve no terminal o que aconteceu
                        console.log(err);
                    }
                }
            });
        }
    });
});

client.login(hidden.TOKEN);