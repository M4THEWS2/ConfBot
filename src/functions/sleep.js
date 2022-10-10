"use strict"
const events = require("../events.js");

module.exports = {
    funcName: "sleep",
    funcFunc: async (message, args, funcObj, commandName) => {
        setTimeout(() => {
            events.emit("runFunc", message, args, funcObj.callback, commandName);
        }, funcObj.time || 5000);
    }
}
