'use strict'

// Import essential modules
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

// Create a new Discord client
const client = new Discord.Client({
  intents: [
    "GuildMessages",
    "MessageContent",
    "Guilds",
    "GuildBans",
    "GuildMembers",
  ],
});

// Import config
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/config.json"), "utf8")
);

// Import language
const lang = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/lang.json"), "utf8")
);

// Get all the commands from the config file
const commands = new Discord.Collection();
config.commands.forEach((command) => {
  commands.set(command.name, command.functions);
});

// Get all functions from the functions folder
const functions = new Discord.Collection();
fs.readdirSync(path.join(__dirname, "./functions")).forEach((file) => {
  const func = require(`./functions/${file}`);
  functions.set(func.func_name, func.func);
});

// Create the log stream
const log = fs.createWriteStream(path.join(__dirname, "../logs.log"), {
  flags: "a",
  encoding: "utf-8",
});

const events = require("./events");

// When the client is ready, run this code
client.on("ready", () => {
  console.log(lang.ready);
});

// Function to run a function
async function runFunction(message, args, func, command, count) {
  // If the function doesn't exist, send error message
  if (functions.has(func.name)) {
    // Replace the variables in the function
    Object.entries(func).forEach(([key, value]) => {
      if (typeof value === "string") {
        func[key] = value.replace(/{user}/g, `<@${message.author.id}>`);
      } else if (typeof value == "object") {
        Object.entries(value).forEach(([key2, value2]) => {
          if (typeof value2 === "string") {
            value[key2] = value2.replace(/{user}/g, `<@${message.author.id}>`);
          }
        });
      }
    });

    let success = true;
    // Run the function
    await functions.get(func.name)?.(message, args, func).catch((error) => {
      // If there is an error, send error message
      message.reply(lang.functionError);
      // Log the error
      log.write(
        `${message.author.tag} (${message.author.id}) ran command ${command} and got error ${error} - ${new Date().toLocaleString()}\n`
      );
      // Send the error in the console
      console.error(`\nERROR:\n ${error}`);
      success = false;
    });
    // If the function was successful, log it
    if (success) {
      // Log the command
      log.write(
        `[${message.author.tag}] (${message.author.id}) ran the function [${func.name
        }] with the command [${command}] (${count} time(s)) at ${message.guild?.name
        } (${message.guild?.id}). ---> ${new Date().toLocaleString()}\n`
      );
    }
  } else {
    // Send error message
    console.error(
      `\nERROR:\n---*Function ${func.name} does not exist.*---`
    );
    // Log the error
    log.write("---*Function " + func.name + " does not exist.*---\n");
    // Send error message in discord channel
    message.reply(lang.functionError);
    return;
  }
}

// When a message is sent, run this code
client.on("messageCreate", (message) => {
  // If the message is sent by a bot, ignore it
  if (message.author.bot) return;
  // If the message doesn't start with the prefix, ignore it
  if (!message.content.startsWith(config.prefix)) return;

  // Get the command name and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase() || "";

  // If the command doesn't exist, send error message
  if (commands.has(command)) {
    // Count the times the function has been called
    let count = 1;
    // Get the functions for the command
    commands.get(command)?.forEach((func) => {
      // Run the function
      runFunction(message, args, func, command, count);
      count += 1;
    });
  } else {
    // Send error message
    message.reply(lang.commandDoesNotExist);
  }
});

// Run function received by other in execution
events.on("runFunc", (message, args, func, command) => {
  runFunction(message, args, func, command, 1);
});

// Login to Discord with your client's token
client.login(config.token);
