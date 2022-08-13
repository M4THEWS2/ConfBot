// Import essential modules
import * as Discord from "discord.js";
import * as fs from "fs";
import * as path from "path";

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

// Get all the commands from the config file
const commands = new Discord.Collection<string, any[]>();
config.commands.forEach((command: { name: string; functions: any[] }) => {
  commands.set(command.name, command.functions);
});

// Get all functions from the functions folder
const functions = new Discord.Collection<string, Function>();
fs.readdirSync(path.join(__dirname, "./functions")).forEach((file) => {
  const func = require(`./functions/${file}`);
  functions.set(func.func_name, func.func);
});

// Create the log stream
const log = fs.createWriteStream(path.join(__dirname, "../logs.log"), {
  flags: "a",
  encoding: "utf-8",
});

// When the client is ready, run this code
client.on("ready", () => {
  console.log("Your Bot is now online!");
});

// When a message is sent, run this code
client.on("messageCreate", (message) => {
  // If the message is sent by a bot, ignore it
  if (message.author.bot) return;
  // If the message doesn't start with the prefix, ignore it
  if (!message.content.startsWith(config.prefix)) return;

  // Get the command name and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase() || "No command";

  // If the command doesn't exist, send error message
  if (commands.has(command)) {
    // Count the times the function has been called
    let count = 1;
    // Get the functions for the command
    commands.get(command)?.forEach((func) => {
      // If the function doesn't exist, send error message
      if (functions.has(func.name)) {
        // Run the function
        functions.get(func.name)?.(message, args, func);
        // Log the command
        log.write(
          `[${message.author.tag}] (${message.author.id}) ran the function [${
            func.name
          }] (for the ${count} time) with the command [${command}] at ${
            message.guild?.name
          } (${message.guild?.id}). ---> ${new Date().toLocaleString()}\n`
        );
        count += 1;
      } else {
        // Send error message
        console.error(
          `\nERROR:\n---*Function ${func.name} does not exist.*---`
        );
        // Send error message in discord channel
        message.reply("An internal error has occured.");
      }
    });
  } else {
    // Send error message
    message.reply(`Command ${command} does not exist.`);
  }
});

// Login to Discord with your client's token
client.login(config.token);
