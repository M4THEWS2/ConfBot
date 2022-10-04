'use strict'

module.exports = {
    func_name: "send_file",
    func_func: async (message, args, funcObj) => {
        // Define file to be sent
        const file = {
            attachment: funcObj.path,
            name: funcObj.fileName,
            description: funcObj.description
        };
        
        // If the function is supposed to send the message as a reply, do it
        if (funcObj.reply) {
            await message.reply({ files: [ file ], content: funcObj.message });
        } else {
            await message.channel.send({ files: [ file ], content: funcObj.message });
        }
    }
}