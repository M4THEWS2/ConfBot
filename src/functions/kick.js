'use strict'
const lang = require('../../config/lang.json');
const events = require('../events.js');

module.exports = {
  func_name: "kick",
  func_func: async (message, args, funcObj, commandName) => {
    if (!funcObj.member) {
      throw new Error("No member specified.");
    }

    if (funcObj.member === lang.noMentionMessage || !message.mentions.members.has(funcObj.member.split("@")[1].split(">")[0])) {
      if (!funcObj.bot) {
        await message.reply(lang.noMentionError);
        return;
      }
    }

    if (!funcObj.yourself && message.author.id === funcObj.member.split("@")[1].split(">")[0]) {
      await message.reply(lang['cantBan&KickYourself']);
      return;
    }

    if (funcObj.bot || message.member.permissions.has("ADMINISTRATOR")) {
      try {
        if (!funcObj.bot) {
          await message.mentions.members.get(funcObj.member.split("@")[1].split(">")[0]).kick({ reason: funcObj.reason || args.slice(1).join(" ") });
        } else {
          await message.guild.members.cache.get(funcObj.member.split("@")[1].split(">")[0]).kick({ reason: funcObj.reason || args.slice(1).join(" ") });
        }
      } catch (err) {
        if (err.code === 50013) {
          await message.reply(lang.botMissingAdminPermissions);
        } else {
          throw err;
        }
      }
      if (funcObj.callback) {
        events.emit("runFunc", message, args, funcObj.callback, commandName);
      }
    } else {
      await message.reply(lang.missingAdminPermissions);
    }
  }
}