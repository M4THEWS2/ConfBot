"use strict";
var Discord = require('discord.js');
var config = require('../config.json');
var client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
var token = config.token;
