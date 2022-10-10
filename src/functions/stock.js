"use strict"

// Import fs module
const fs = require("fs");
// Import events
const events = require("../events");

/*
        Stock Function
This function needs only one option:
    - path (Where will the function get the item from)
    - message (Item with {item})
    - emptyStockCallback
    - reply
*/

module.exports = {
    funcName: "stock",
    funcFunc: async (message, args, funcObj, commandName) => {
        if (!funcObj.path) {
            throw new Error("Stock function needs path property.");
        }

        const fileText = fs.readFileSync(funcObj.path, {encoding: "utf-8"}).split("\n");
        let randomIndex = Math.floor(Math.random() * fileText.length);

        if (fileText[randomIndex] == "") {
            if (funcObj.emptyStockCallback && fileText.length <= 1) {
                events.emit("runFunc", message, args, funcObj.emptyStockCallback, commandName);
                return;
            } else {
                randomIndex--;
            }
        }

        if (funcObj.reply) {
            await message.reply(funcObj.message.replace(/{item}/g, fileText[randomIndex]));
        } else {
            await message.channel.send(funcObj.message.replace(/{item}/g, fileText[randomIndex]));
        }

        fileText.splice(randomIndex, 1);
        fs.writeFileSync(funcObj.path, fileText.join("\n"), {encoding: "utf-8"});
    }
}
