"use strict"
const events = require("../events");

module.exports = {
    funcName: "loop",
    funcFunc: async (message, args, funcObj, commandName) => {
        if (!funcObj.times || typeof(funcObj.times) != "number") {
            throw new Error("'loop' function must has times property (as a number)!");
        }

        for (let i = 0; i < funcObj.times; i++) {
            events.emit("runFunc", message, args, funcObj.callback, commandName);
        }
    }
}
