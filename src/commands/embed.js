const Discord = require('discord.js');
const getVariables = require('../functions/getVariables.js');
const config = require('../../config.json');

module.exports = function (client, msg, args, command) {
    let embed = new Discord.MessageEmbed()
        .setAuthor(getVariables(command.embedContent.author, msg))
        .setTitle(getVariables(command.embedContent.title, msg))
        .setDescription(getVariables(command.embedContent.description, msg))
        .setThumbnail(getVariables(command.embedContent.thumbnail, msg))
        .setImage(getVariables(command.embedContent.image, msg))
        .setFooter(getVariables(command.embedContent.footer, msg));
    
    if (command.embedContent.color) {
        embed.setColor(command.embedContent.color);
    };

    if (!command.reply) {
        msg.channel.send({ "embeds": [embed] });
    } else {
        msg.reply({ "embeds": [embed] });
    }
}