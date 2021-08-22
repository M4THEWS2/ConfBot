const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = function (client, msg, args, command) {
    let embed = new Discord.MessageEmbed()
        .setAuthor(command.embedContent.author)
        .setTitle(command.embedContent.title)
        .setDescription(command.embedContent.description)
        .setThumbnail(command.embedContent.thumbnail)
        .setImage(command.embedContent.image);
    
    if (command.embedContent.color) {
        embed.setColor(command.embedContent.color);
    };

    msg.reply({"embeds": [embed]});
}