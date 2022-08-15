'use strict'
const events = require('../events.js');

module.exports = {
  func_name: "array",
  func: async (message, args, func) => {
    func.functions.forEach((fn) => {
      events.emit("runFunc", message, args, fn, `(function ${fn.name})`);
    });
  }
}