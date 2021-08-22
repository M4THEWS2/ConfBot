const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = function (client, msg, args, command) {
    msg.reply(command.content);
}