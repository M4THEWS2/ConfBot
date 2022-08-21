'use strict'
const Discord = require('discord.js');
const events = require('../events.js');

module.exports = {
  func_name: "button",
  func_func: async (message, args, funcObj, commandName) => {
    // Create a row wich the button(s) will be in
    const row = new Discord.ActionRowBuilder();
    // Count the buttons
    let total_buttons = 1;
    // Create the buttons
    funcObj.buttons.forEach((button) => {
      // If the total buttons is 5, send the message and stop adding buttons
      if (total_buttons > 5) {
        throw new Error("Maximum of 5 buttons.");
      }
      row.addComponents(
        new Discord.ButtonBuilder()
          .setCustomId(String(Math.floor(Math.random() * 999999)))
          .setLabel(button.label)
          .setStyle(button.style)
      );
      // Add 1 to the total buttons
      total_buttons += 1;
    });

    // Create a filter for the button collections
    const filter = i => i.member.id === message.author.id;
    // Create a collector wich will be activated when someone press some button
    const collector = message.channel.createMessageComponentCollector({ filter, time: funcObj.expiration || 60000 });
    collector.on('collect', async i => {
      // If the interaction is not a button, ignore it
      if (!i.isButton()) return;
      row.components.forEach((button, index) => {
        // If button has a callback, run it
        if (funcObj.buttons[index].callback) {
          // If the button id is the same as the button pressed, run the function
          if (button.data.custom_id === i.customId) {
            events.emit("runFunc", message, args, funcObj.buttons[index].callback, commandName);
          }
        }
        // Set the button to disabled
        button.setDisabled(true);
      });
      // Stop collecting buttons
      collector.stop();
      // Update the message
      i.update({ components: [row] });
    });

    let sentMessage = null;
    // Send the message with the buttons
    if (funcObj.reply) {
      sentMessage = await message.reply({ content: funcObj.message, components: [row] });
    } else {
      sentMessage = await message.channel.send({ content: funcObj.message, components: [row] });
    }

    // If the collector stop because of the time, set the buttons to disabled, send the message, and stop the collector
    collector.on('end', (collected, reason) => {
      if (reason === "time") {
        row.components.forEach((button) => {
          button.setDisabled(true);
        });
        sentMessage.edit({ components: [row] });

        if (funcObj.timeEndCallback) {
          events.emit("runFunc", message, args, funcObj.timeEndCallback, commandName);
        }
      }
      collector.stop();
    });
  }
}