const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const getVariables = require('./support/getVariables.js');
const date = new Date();
const activities = require('../activities.json');

function executeCommand(msg) {
    if (msg.author.bot === true) { return } // Se a mensagem for de um bot retorna
    else if (!msg.content.startsWith(config.prefix)) { return }; // Se a mensagem não começar com o prefixo retorna

    let command = msg.content.split(" ")[0]; // Cria uma variável que contém o comando enviado com o prefixo
    command = command.substring(config.prefix.length, command.length).toLowerCase(); // Retira o prefixo do comando

    let args = msg.content.split(" "); // Cria uma variável de argumentos
    args[0] = command;

    let res = false;
    config.commands.forEach((value, index, array) => {
        if (command == value.name.toLowerCase()) {
            value.functions.forEach((val, ind, arr) => {
                try {
                    let commandFunction = require(`./functions/${val.name}.js`);
                    commandFunction(client, msg, args, val);
                } catch (err) {
                    let errembed = new Discord.MessageEmbed()
                        .setTitle("ConfBot Error")
                        .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```")
                        .setFooter("Atenção: somente reporte um bug se você estiver certo de que o bug é realmente um bug ou se é simplismente um problema no seu arquivo de configuração. Veja a saída do erro acima e verifique se isto é realmente um bug.");

                    msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro

                    if (config.printErrOnTerminal) { // Se estiver ativo escreve no terminal o que aconteceu
                        console.log(err);
                    }
                }
            });
            res = true;
        }
    });

    if (!res) {
        // Caso não retorne, fala que o comando não foi encontrado
        let cmdNotFound = new Discord.MessageEmbed()
            .setTitle("Comando não encontrado:")
            .setDescription(getVariables(config.commandNotFoundMessage, msg));

        msg.reply({ "embeds": [cmdNotFound] })
        if (config.printErrOnTerminal) {
            console.log(`${command}: not found.`);
        }
    }
}

// Quando o bot ficar on
client.on('ready', () => {
    console.log(`I'm ready at: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`); // Manda uma mensagem quando o bot estiver pronto

    let i;
    setInterval(() => {
        i = activities[Math.floor(Math.random() * activities.length)]; // Copia uma activitie aleatória do array json
        client.user.setActivity(i.msg, { type: i.type /*Type pode ser: "WATCHING", "PLAYING", "STREAMING", "LISTENING", "CUSTOM", "COMPETING"*/ });
    }, 5000);
});

// Toda vez que um mensagem for enviada
client.on("messageCreate", msg => {
    executeCommand(msg);
});

client.on("messageUpdate", (oldMsg, msg) => {
    executeCommand(msg);
})

// Deixa o bot on
client.login(config.token);