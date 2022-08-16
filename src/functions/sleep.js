'use strict'
const events = require('../events.js');

module.exports = {
  func_name: "sleep",
  func_func: async (message, args, funcObj, commandName) => {
    setTimeout(() => {
      events.emit("runFunc", message, args, funcObj.callback, commandName);
    }, funcObj.time || 5000);
    return;
  }
}