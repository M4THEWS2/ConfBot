"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Natriy = void 0;
const discord_js_1 = require("discord.js");
const Executable_1 = require("./Executable");
const Config_1 = require("./Config");
const SayAction_1 = require("./Actions/SayAction");
const MacroAction_1 = require("./Actions/MacroAction");
const DelayAction_1 = require("./Actions/DelayAction");
const RepeatAction_1 = require("./Actions/RepeatAction");
const KickAction_1 = require("./Actions/KickAction");
const events_1 = require("events");
class Natriy {
    constructor(configPath) {
        var _a;
        this.typeTable = [
            ["say", SayAction_1.SayAction],
            ["macro", MacroAction_1.MacroAction],
            ["delay", DelayAction_1.DelayAction],
            ["repeat", RepeatAction_1.RepeatAction],
            ["kick", KickAction_1.KickAction],
        ];
        this.client = new discord_js_1.Client({
            intents: ["Guilds", "GuildBans", "GuildMembers", "GuildMessages", "MessageContent"],
        });
        this.config = new Config_1.Config(configPath);
        if (!this.config.options) {
            throw new Error("You must set at least the 'token' option! Missing options section in config file!");
        }
        this.commands = new Map();
        this.macros = new Map();
        this.emitter = new events_1.EventEmitter();
        this.emitter.on("macro", (name, message) => {
            this.runMacro(name, message);
        });
        let _c;
        if (!(_c = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.get("prefix"))) {
            this.prefix = "!";
            console.warn('Warn: No prefix in config file. Using "!".');
        }
        else {
            this.prefix = _c;
        }
        const commandList = this.config.getExecutables("commands");
        for (const [commandName, command] of commandList) {
            this.commands.set(commandName, new Executable_1.Executable(commandName, this.resolveActions(command.actions), command.options));
        }
        const macroList = this.config.getExecutables("macros");
        for (const [macroName, macro] of macroList) {
            this.macros.set(macroName, new Executable_1.Executable(macroName, this.resolveActions(macro.actions), macro.options, true));
        }
        this.client.on("ready", () => {
            const date = new Date();
            console.log(`Ready! ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`);
        });
        this.client.on("messageCreate", (message) => __awaiter(this, void 0, void 0, function* () {
            var _b, _d;
            message.content = message.content.trimStart().trimEnd();
            if (!message.content.startsWith(this.prefix)) {
                return;
            }
            const command = message.content.split(" ")[0].slice(this.prefix.length);
            const log = yield ((_b = this.commands.get(command)) === null || _b === void 0 ? void 0 : _b.execute(this.client, message, this.emitter));
            if (!log) {
                if ((_c = (_d = this.config.options) === null || _d === void 0 ? void 0 : _d.get("command-not-found"))) {
                    this.runMacro(_c, message);
                }
            }
            else {
                console.log(log.text);
            }
        }));
        this.client.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            if (interaction.isButton()) {
                const buttons = [];
                for (const button of interaction.message.components[0].components) {
                    if (button.type == discord_js_1.ComponentType.Button) {
                        buttons.push(new discord_js_1.ButtonBuilder(button.data).setDisabled(true));
                    }
                }
                interaction.update({
                    components: [{ type: 1, components: buttons }],
                });
                let [eventName, messageId] = interaction.customId.split("/");
                messageId = messageId.split(" ")[0];
                (_e = interaction.channel) === null || _e === void 0 ? void 0 : _e.messages.fetch(messageId).then((message) => {
                    this.runMacro(eventName, message);
                }).catch(() => {
                    this.runMacro(eventName, interaction.message);
                });
            }
        }));
    }
    login() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let _c;
            if (!(_c = (_a = this.config.options) === null || _a === void 0 ? void 0 : _a.get("token"))) {
                throw new Error("No token in configuration file!");
            }
            this.client.login(_c);
        });
    }
    runMacro(name, message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const log = yield ((_a = this.macros.get(name)) === null || _a === void 0 ? void 0 : _a.execute(this.client, message, this.emitter));
            if (!log) {
                throw new Error(`macro '${name}' does not exists.`);
            }
            else {
                if ((_b = this.config.options) === null || _b === void 0 ? void 0 : _b.has("log-macro")) {
                    console.log(log.text);
                }
            }
        });
    }
    resolveActions(actions) {
        const definedActions = [];
        let _c;
        for (const action of actions) {
            if (!(_c = action.get("type"))) {
                throw new Error("action requires option 'type'.");
            }
            const type = _c;
            for (const [actionName, actionClass] of this.typeTable) {
                if (actionName == type) {
                    definedActions.push(new actionClass(action));
                }
            }
        }
        return definedActions;
    }
}
exports.Natriy = Natriy;
