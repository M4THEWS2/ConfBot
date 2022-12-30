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
exports.Executable = void 0;
const discord_js_1 = require("discord.js");
class Executable {
    constructor(name, actions, options, macro = false) {
        this.name = name;
        this.actions = actions;
        this.macro = macro;
        this.options = options;
    }
    execute(client, message, emitter) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            let _c;
            if ((_c = this.options.get("allowedchannels"))) {
                if ((_c == "whitelist" && !this.options.getArray("channel-id").includes(message.channelId)) ||
                    (_c == "blacklist" && this.options.getArray("channel-id").includes(message.channelId))) {
                    return {
                        successful: false,
                        text: `${message.author.username} (${message.author.id}) tried to execute '${this.name}'${this.macro ? " (macro)" : ""} in a prohibited channel: '${message.channel.type == discord_js_1.ChannelType.GuildText ? message.channel.name : "Could not get name"}' (${message.channelId}) --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
                    };
                }
            }
            try {
                for (const action of this.actions) {
                    yield action.do(client, message, emitter);
                }
                return {
                    successful: true,
                    text: `${message.author.username} (${message.author.id}) executed '${this.name}'${this.macro ? " (macro)" : ""} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
                };
            }
            catch (err) {
                return {
                    successful: true,
                    text: `${message.author.username} (${message.author.id}) executed ${this.name}${this.macro ? " (macro)" : ""} and got error ${err} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
                };
            }
        });
    }
}
exports.Executable = Executable;
