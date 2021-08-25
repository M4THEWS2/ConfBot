const Discord = require('discord.js');
const config = require('../../config.json');
const getVariables = require('../support/getVariables.js');

module.exports = function (client, msg, args, command) {
    msg.reply(getVariables(command.content, msg)); // Responde mensagem enviada
}