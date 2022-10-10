"use strict"
module.exports = {
    funcName: "sendFromFile",
    funcFunc: async (message, args, funcObj) => {
        // Import fs module
        const fs = require("fs");
        // Read the file
        let fileText = fs.readFileSync(funcObj.path, "utf-8");

        // Send the message in slices because Discord only accepts messages with length between 0 and 2000
        for (let i = 0; i < fileText.length / 2000 + 2; i++) {
            // If the new sliced text is empty break for loop
            if (fileText == "") {
                break;
            }

            // Get the first 2000 digits
            let slicedFileText = fileText.slice(0, 2000);

            // If the reply option is true, reply it
            if (funcObj.reply) {
                await message.reply(slicedFileText);
            } else {
                await message.channel.send(slicedFileText);
            }

            // Remove the first 2000 digits from string
            fileText = fileText.slice(2000);
        }
    }
}
