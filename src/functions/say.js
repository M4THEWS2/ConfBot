'use strict'
const Discord = require('discord.js');

module.exports = {
  func_name: "say",
  func: async (message, args, func) => {
    try {
      message.channel.send(func.message);
    } catch (err) {
      throw err;
    }
  }
}