const Discord = require('discord.js');
const getVariables = require('../support/getVariables.js');
const config = require('../../config.json');

module.exports = function (client, msg, args, command) {
    let embed = new Discord.MessageEmbed() // Cria embed com sua config
        .setAuthor(getVariables(command.embedContent.author, msg))
        .setTitle(getVariables(command.embedContent.title, msg))
        .setDescription(getVariables(command.embedContent.description, msg))
        .setThumbnail(getVariables(command.embedContent.thumbnail, msg))
        .setImage(getVariables(command.embedContent.image, msg))
        .setFooter(getVariables(command.embedContent.footer, msg));
    
    if (command.embedContent.color) {
        embed.setColor(command.embedContent.color); // Se tiver uma cor coloca ela
    };

    if (!command.reply) {
        msg.channel.send({ "embeds": [embed] }); // Se não tiver uma reply envia o embed
    } else {
        msg.reply({ "embeds": [embed] }); // Se tiver uma reply responde com um embed
    }
}