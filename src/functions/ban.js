'use strict'
const lang = require('../../config/lang.json');
const events = require('../events.js');

module.exports = {
  func_name: "ban",
  func_func: async (message, args, funcObj, commandName) => {
    let memberId = null
    
    if (!funcObj.member) {
      if (funcObj.yourself) {
        memberId = message.author.id;
      } else {
        throw new Error("No member specified.");
      }
    } else {
      if (funcObj.member === lang.noMentionMessage) {
        await message.reply(lang.noMentionError);
        return;
      }
      memberId = funcObj.member.split("@")[1].split(">")[0];
    }

    if (!funcObj.yourself && message.author.id === memberId) {
      await message.reply(lang['cantBan&KickYourself']);
      return;
    }

    if (funcObj.bot || message.member.permissions.has("BAN_MEMBERS")) {
      await message.guild.members.fetch(memberId).then(async member => {
        await member.ban({ reason: funcObj.reason || args.slice(1).join(" ") });
      }).catch(err => {
        if (err.code === 50013) {
          message.reply(lang.botMissingPermissions);
        } else {
          throw err;
        }
      });
      if (funcObj.callback) {
        events.emit("runFunc", message, args, funcObj.callback, commandName);
      }
    } else {
      message.reply(lang.MissingPermissions);
    }
  }
}