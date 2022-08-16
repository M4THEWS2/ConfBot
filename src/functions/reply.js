'use strict'
module.exports = {
  func_name: "reply",
  func_func: async (message, args, funcObj, commandName) => {
    await message.reply(funcObj.message);
  }
}