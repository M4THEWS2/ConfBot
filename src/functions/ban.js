const Discord = require('discord.js');
const getVariables = require('../support/getVariables.js');
const config = require('../../config.json');

module.exports = function (client, msg, args, command) {
    try {
        try {
            let member = msg.mentions.members.first();
            member.ban({ reason: args[2] ? args[2] : undefined });
        } catch (err) {
            let errembed = new Discord.MessageEmbed()
                .setTitle(getVariables(command.banErrorMessage, msg));
            
            msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro

            if (config.printErrOnTerminal) { // Se estiver ativo printa no terminal o que aconteceu
                console.log(err);
            };

            return;
        }

        if (command.content) {
            if (command.reply) {
                let suceEmbed = new Discord.MessageEmbed()
                    .setTitle(getVariables(command.content, msg));

                msg.reply({ "embeds": [suceEmbed] });
            } else {
                let suceEmbed = new Discord.MessageEmbed()
                    .setTitle(getVariables(command.content, msg));

                msg.channel.send({ "embeds": [suceEmbed] });
            }
        };

        if (command.embedContent) {
            let embed = require('./embed.js');
            embed(client, msg, args, command);
        };
    }
    catch (err) {
        let errembed = new Discord.MessageEmbed()
            .setTitle("ConfBot Error")
            .setDescription("> Ocorreu um erro durante a execução do código :disappointed_relieved:. Tente contatar o desenvolvedor deste bot saber a causa do erro. Se você for o desenvolvedor e encontrou um bug, entre na documentação do ConfBot: https://github.com/M4THEWS2/ConfBot/issues e reporte-o.\n ```" + err + "```")
            .setFooter("Atenção: somente reporte um bug se você estiver certo de que o bug é realmente um bug ou se é simplismente um problema no seu arquivo de configuração. Veja a saída do erro acima e verifique se isto é realmente um bug.");

        msg.reply({ "embeds": [errembed] }); // Envia mensagem de erro

        if (config.printErrOnTerminal) { // Se estiver ativo printa no terminal o que aconteceu
            console.log(err);
        };
    };
}