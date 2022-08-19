'use strict'
const Discord = require('discord.js');

module.exports = {
  func_name: "embed",
  func_func: async (message, args, funcObj) => {
    // Create the embed
    const embed = new Discord.Embed(funcObj.embed);
    // Send the embed
    if (funcObj.reply) {
      await message.reply({ content: funcObj.message, embeds: [embed] });
    } else {
      await message.channel.send({ content: funcObj.message, embeds: [embed] });
    }
  }
}
