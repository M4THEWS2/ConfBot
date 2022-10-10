"use strict"
const events = require("../events");

module.exports = {
    funcName: "array",
    funcFunc: async (message, args, funcObj, commandName) => {
        events.emit("runFunc", message, args, funcObj.functions, commandName, true);
    }
}
