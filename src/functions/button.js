'use strict'
const Discord = require('discord.js');
const events = require('../events.js');
const lang = require('../../config/lang.json');

module.exports = {
  func_name: "button",
  func: async (message, args, func) => {
    // Create a row wich the button(s) will be in
    const row = new Discord.ActionRowBuilder();
    // Count the buttons
    let total_buttons = 0;
    // Create the buttons
    func.buttons.forEach((button) => {
      row.addComponents(
        new Discord.ButtonBuilder()
          .setCustomId(String(Math.floor(Math.random() * 999999)))
          .setLabel(button.label)
          .setStyle(button.style)
      );
      // Add 1 to the total buttons
      total_buttons += 1;
      // If the total buttons is 5, send the message and stop adding buttons
      if (total_buttons > 5) {
        console.error("\n---> Maximum of 5 buttons.");
        return;
      }
    });

    // Create a filter for the button collections
    const filter = i => i.member.id === message.author.id;
    // Create a collector wich will be activated when someone press some button
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
    collector.on('collect', async i => {
      try {
        // If the interaction is not a button, ignore it
        if (!i.isButton()) return;
        row.components.forEach((button, index) => {
          // If button has a callback, run it
          if (func.buttons[index].callback) {
            // If the button id is the same as the button pressed, run the function
            if (button.data.custom_id === i.customId) {
              events.emit("runFunc", message, args, func.buttons[index].callback, "(function button)");
            }
          }
          // Set the button to disabled
          button.setDisabled(true);
        });
        // Stop collecting buttons
        collector.stop();
        // Update the message
        i.update({ components: [row] });
      } catch (err) {
        throw err;
      }
    });

    let sentMessage = null;
    try {
      // Send the message with the buttons
      if (func.reply) {
        sentMessage = await message.reply({ content: func.message, components: [row] });
      } else {
        sentMessage = await message.channel.send({ content: func.message, components: [row] });
      }
    } catch (err) {
      throw err;
    }

    // If the collector stop because of the time, set the buttons to disabled, send the message, and stop the collector
    collector.on('end', (collected, reason) => {
      try {
        if (reason === "time") {
          message.reply(lang.buttonClickTimeout);
          row.components.forEach((button) => {
            button.setDisabled(true);
          });
          sentMessage.edit({ components: [row] });
        }
        collector.stop();
      } catch (err) {
        throw err;
      }
    });
  }
}