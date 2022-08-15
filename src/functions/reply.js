'use strict'
module.exports = {
  func_name: "reply",
  func: async (message, args, func) => {
    try {
      message.reply(func.message);
    } catch (err) {
      throw err;
    }
  }
}