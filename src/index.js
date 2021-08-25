const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const getVariables = require('./support/getVariables.js');
const date = new Date();
const activities = require('../activities.json');

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
    if (msg.author.bot === true) { return } // Set a mensagem for de um bot restorna
    else if (!msg.content.startsWith(config.prefix)) { return }; // Se a mensagem não começar com o prefixo retorna

    let command = msg.content.includes(" ") ? msg.content.split(" ")[0] : msg.content; // Cria uma variável que contém o comando enviado com o prefixo
    command = command.substring(config.prefix.length, command.length).toLowerCase(); // Retira o prefixo do comando

    let args = msg.content.split(" "); // Cria uma variável de argumentos

    for (let confCommand = 0; confCommand < config.commands.length; confCommand++) { // Todos os comandos dentro do config.json
        if (command == config.commands[confCommand].name.toLowerCase()) { // Verifica se o command bate com algum comando dentro do config.json 
            for (let functionName = 0; functionName < Object.keys(config.commands[confCommand].functions).length; functionName++) { // Começa a pegar todas as funções do comando e tenta executa-las
                try {
                    let commandFunction = require(`./functions/${config.commands[confCommand].functions[functionName].name}.js`); // Procura pelo comando digitado no config.json
                    commandFunction(client, msg, args, config.commands[confCommand].functions[functionName]); // Caso encontre o executa
                } catch (err) { // Se não conseguir executar o comando
                    let errembed = new Discord.MessageEmbed()
                        .setTitle("ConfBot Error")
                        .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```")
                        .setFooter("Atenção: somente reporte um bug se você estiver certo de que o bug é realmente um bug ou se é simplismente um problema no seu arquivo de configuração. Veja a saída do erro acima e verifique se isto é realmente um bug.");

                    msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro

                    if (config.printErrOnTerminal) { // Se estiver ativo printa no terminal o que aconteceu
                        console.log(err);
                    }
                }
            }

            return; // Caso encontre algum comando com o nome, retorna no final da execução
        }
    }

    // Caso não retorne printa outro erro
    let cmdNotFound = new Discord.MessageEmbed()
        .setTitle("Comando não encontrado:")
        .setDescription(getVariables(config.commandNotFoundMessage, msg));

    msg.reply({ "embeds": [cmdNotFound] })
    if (config.printErrOnTerminal) {
        console.log(`${command}: not found.`);
    }
});

// Deixa o bot on
client.login(config.token);