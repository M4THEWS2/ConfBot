'use strict'
const Discord = require('discord.js');

module.exports = {
  func_name: "embed",
  func: async (message, args, func) => {
    // Create the embed
    const embed = new Discord.Embed(func.embed);
    // Send the embed
    try {
      if (func.reply) {
        await message.reply({ content: func.message, embeds: [embed] });
      } else {
        await message.channel.send({ content: func.message, embeds: [embed] });
      }
    } catch (err) {
      throw err;
    }
  }
}
