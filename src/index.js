const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log("I'm ready!!")
});

client.on("messageCreate", msg => {
    if (msg.author.bot === true) { return }
    else if (!msg.content.startsWith(config.prefix)) { return };

    let command = msg.content.includes(" ") ? msg.content.split(" ")[0] : msg.content;
    command = command.substring(config.prefix.length, command.length).toLowerCase();

    let args = msg.content.split(" ");

    for (let confCommand = 0; confCommand < config.commands.length; confCommand++) { // Todos os comandos dentro do config.json
        if (command == config.commands[confCommand].name.toLowerCase()) { // Verifica se o command bate com algum comando dentro do config.json 
            for (let functionName = 0; functionName < Object.keys(config.commands[confCommand].functions).length; functionName++) { // Começa a pegar todas as funções do comando e tenta executa-las
                try {
                    let commandFunction = require(`./commands/${config.commands[confCommand].functions[functionName].name}.js`); // Procura pelo comando digitado no config.json
                    commandFunction(client, msg, args, config.commands[confCommand].functions[functionName]); // Caso encontre o executa
                } catch (err) {
                    let errembed = new Discord.MessageEmbed()
                        .setTitle("ConfBot Error")
                        .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```")
                        .setFooter("Atenção: somente reporte um bug se você estiver certo de que o bug é realmente um bug ou se é simplismente um problema no seu arquivo de configuração. Veja a saída do erro acima e verifique se isto é realmente um bug.");

                    msg.reply({ "embeds": [errembed] });

                    if (config.printErrOnTerminal) {
                        console.log(err);
                    }
                }
            }

            return; // Caso encontre algum comando com o nome digitado retorna
        }
    }

    let cmdNotFound = new Discord.MessageEmbed()
        .setTitle("Comando não encontrado:")
        .setDescription(config.commandNotFoundMessage);

    msg.reply({ "embeds": [cmdNotFound] })
    if (config.printErrOnTerminal) {
        console.log(`${command}: not found.`);
    }
});

client.login(config.token);