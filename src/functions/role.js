"use strict"
const lang = require("../../config/lang.json");
const events = require("../events");

module.exports = {
    funcName: "role",
    funcFunc: async (message, args, funcObj, commandName) => {
    // Verify if the role is specified
        if (funcObj.role) {
            // Verify id the user has the required permission to run this command or if the user doesn't need permissions
            if (funcObj.bot || message.member.permissions.has("MANAGE_ROLES")) {
                // Initialize member variable
                let member = null;
                // Check if the member is specified
                if (funcObj.member) {
                    // If the member specified doesn't exists send error
                    if (funcObj.member == lang.noMentionMessage) {
                        await message.reply(lang.noMentionError);
                        return;
                    }
                    // Set member
                    await message.guild.members.fetch(funcObj.member.split("@")[1].split(">")[0]).then(m => {
                        member = m;
                    });
                } else {
                    // If not the member will be the user who sent the command
                    member = message.member;
                }

                // Get the role from the message guild
                await message.guild.roles.fetch(funcObj.role).then(async role => {
                    try {
                        // If the method is 'add' add the role
                        if (funcObj.method === "add" || funcObj.method === 1) {
                            await member.roles.add(role.id);
                        } else if (funcObj.method === "remove" || funcObj.method === -1) { // Otherwise remove the role
                            await member.roles.remove(role.id);
                        } else {
                            // Or, send an error because no method was specified
                            throw new Error("invalid method or not specified!");
                        }

                        // If there a callback run it
                        if (funcObj.callback) {
                            events.emit("runFunc", message, args, funcObj.callback, commandName);
                        }
                    } catch (err) {
                        if (err.code == 50013) {
                            await message.reply(lang.botMissingPermissions);
                        } else {
                            throw err;
                        }
                    }
                }).catch(err => {
                    throw err;
                });
            } else {
                await message.reply(lang.MissingPermissions);
            }
        } else {
            // If not, send error
            throw new Error("role was not specified!");
        }
    }
}
