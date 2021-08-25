const Discord = require('discord.js');
const config = require('../../config.json');
const getVariables = require('../support/getVariables.js');

module.exports = function (client, msg, args, command) {
    msg.channel.send(getVariables(command.content, msg)); // Envia mensagem no chat
}