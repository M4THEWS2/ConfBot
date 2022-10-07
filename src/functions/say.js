'use strict'
const Discord = require('discord.js');
const events = require('../events');

module.exports = {
  func_name: "say",
  func_func: async (message, args, funcObj, commandName) => {
    // Create a row which the button(s) will be in
    let row = null;
    // Create variable to store the message that will be sent
    let messageSent = null;

    // Variable to store button interaction collector
    let collector = null;

    // Create variable to store the embed
    let embed = null;

    if (funcObj.buttons) {
      row = new Discord.ActionRowBuilder();

      // Create the buttons
      funcObj.buttons.forEach((button, index) => {
        // If the total buttons is 5, send the message and stop adding buttons
        if (index > 4) {
          throw new Error("Maximum of 5 buttons.");
        }
        row.addComponents(
          new Discord.ButtonBuilder()
            .setCustomId(String(Math.floor(Math.random() * 999999)))
            .setLabel(button.label)
            .setStyle(button.style)
        );
      });

      // Create a filter for the button collections
      const filter = i => i.member.id === message.author.id;
      // Create a collector which will be activated when someone press some button
      collector = message.channel.createMessageComponentCollector({ filter, time: funcObj.expiration || 60000 });

      collector.on('collect', async i => {
        // If the interaction is not a button, ignore it
        if (!i.isButton()) return;
        row.components.forEach((button, index) => {
          // If the button id is the same as the button pressed, run the function
          if (button.data.custom_id === i.customId) {
            // If button has a callback, run it
            if (funcObj.buttons[index].callback) {
              events.emit("runFunc", message, args, funcObj.buttons[index].callback, commandName);
            }
          }
          // Set the button to disabled
          button.setDisabled(true);
        });
        // Stop collecting buttons
        collector.stop();
        // Update the message
        await i.update({ components: [row] });
      });
    }

    if (funcObj.embed) {
      // Create the embed
      embed = new Discord.Embed(funcObj.embed);
    }

    if (funcObj.reply) {
      messageSent = await message.reply({ content: funcObj.message ? funcObj.message : undefined, embeds: embed ? [ embed ] : undefined, components: row ? [ row ] : undefined, files: funcObj.files ? funcObj.files : undefined });
    } else {
      messageSent = await message.channel.send({ content: funcObj.message ? funcObj.message : undefined, embeds: embed ? [embed] : undefined, components: row ? [row] : undefined, files: funcObj.files ? funcObj.files : undefined });
    }

    if (row && collector) {
      // If the collector stop because of the time, set the buttons to disabled, send the message, and stop the collector
      collector.on('end', async (collected, reason) => {
        // Executing the script below generates an error if the messageSent is deleted, the try statement prevents the program from stopping
        try {
          if (reason === "time") {
            // Disable all buttons
            row.components.forEach((button) => {
              button.setDisabled(true);
            });
            // Update buttons in message
            await messageSent.edit({ components: [row] });

            // If there's a time's up function runs it
            if (funcObj.timeIsUpCallback) {
              events.emit("runFunc", message, args, funcObj.timeIsUpCallback, commandName);
            }
          }
          // Stop collector
          collector.stop();
        } catch {
          null;
        }
      });
    }
  }
}