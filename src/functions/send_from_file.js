'use strict'
module.exports = {
    func_name: "send_from_file",
    func_func: async (message, args, funcObj) => {
        // Import fs module
        const fs = require("fs");
        // Read the file
        let file_text = fs.readFileSync(funcObj.path, "utf-8");

        // Send the message in slices because Discord only accepts messages with length between 0 and 2000
        for (let i = 0; i < file_text.length / 2000 + 2; i++) {
            // If the new sliced text is empty break for loop
            if (file_text == "") {
                break;
            }

            // Get the first 2000 digits
            let sliced_file_text = file_text.slice(0, 2000);

            // If the reply option is true, reply it
            if (funcObj.reply) {
                await message.reply(sliced_file_text);
            } else {
                await message.channel.send(sliced_file_text);
            }

            // Remove the first 2000 digits from string
            file_text = file_text.slice(2000);
        }
    }
}