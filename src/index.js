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
  const func_obj = require(`./functions/${file}`);
  functions.set(func_obj.func_name, func_obj.func_func);
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

function replace_variables(obj, message) {  
  // Get all keys and values from the object
  Object.entries(obj).forEach(([key, value]) => {
    // If the value is a string replace the variables
    if (typeof value === "string") {
      obj[key] = obj[key].replace(/{user}/g, `<@${message.author.id}>`);
      obj[key] = obj[key].replace(/{fmention}/g, message.mentions.members.first() ? `<@${message.mentions.members.first().id}>` : lang.noMentionMessage);
      obj[key] = obj[key].replace(/{user_icon}/g, message.author.displayAvatarURL());
      obj[key] = obj[key].replace(/{user_name}/g, message.author.username);

    } else if (typeof value === "object") {
      // If the value is an object, run the function again but in the object
      replace_variables(obj[key], message);
    }
  });
}

function handleError(err, message, commandName) {
  console.error("\n" + err + "\n");
  message.reply(lang.functionError.replace(/{command}/g, commandName));
  log.write(`${message.author.tag} (${message.author.id}) ran the command ${commandName} in ${message.guild.name} (${message.guild.id}) and got Error: ${err?.message} - ${new Date().toLocaleString()}\n`);
}

// Function to run a function
async function runFunction(message, args, funcObj, commandName, isArrayFunc = false, isCommandSpawned = false) {
  let success = true;
  if (isArrayFunc) {
    let func = null
    if (isCommandSpawned) {
      func = JSON.parse(JSON.stringify(funcObj));
      replace_variables(func, message);
    } else {
      func = funcObj;
    }

    for (const fn of func) {
      if (functions.has(fn.name)) {
        await functions.get(fn.name)(message, args, fn, commandName).catch(err => { handleError(err, message, commandName); success = false; });
      } else {
        handleError(new Error("Function doesn't exist."), message, commandName);
        success = false;
        break;
      }
    }
  } else {
    if (functions.has(funcObj.name)) {
      functions.get(funcObj.name)(message, args, funcObj, commandName).catch(err => { handleError(err, message, commandName); success = false; });
    } else {
      handleError(new Error("Function doesn't exist."), message, commandName);
      success = false;
    }
  }

  if (success && isCommandSpawned) {
    log.write(`${message.author.tag} (${message.author.id}) ran the command ${commandName} in ${message.guild.name} (${message.guild.id}) - ${new Date().toLocaleString()}\n`);
  }
}

// When a message is sent, run this code
client.on("messageCreate", async (message) => {
  // If the message is sent by a bot, ignore it
  if (message.author.bot) return;
  // If the message doesn't start with the prefix, ignore it
  if (!message.content.startsWith(config.prefix)) return;

  // Get the command name and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift() || "";

  // If the command doesn't exist, send error message
  if (commands.has(commandName)) {
    runFunction(message, args, commands.get(commandName), commandName, true, true);
  } else {
    // Send error message
    message.reply(lang.commandDoesNotExist);
  }
});

// Run function received by other in execution
events.on("runFunc", (message, args, funcObj, commandName, isFuncArray = false) => {
  runFunction(message, args, funcObj, commandName, isFuncArray, false);
});

// Login to Discord with your client's token
client.login(config.token);
