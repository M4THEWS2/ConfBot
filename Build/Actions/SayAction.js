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
exports.SayAction = void 0;
const discord_js_1 = require("discord.js");
const Config_1 = require("../Config");
const BaseAction_1 = require("./BaseAction");
class SayAction extends BaseAction_1.BaseAction {
    constructor(options) {
        super(options);
    }
    do(client, message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let embedOptions = new Map();
            for (let [key, value] of this.options) {
                if (!key.startsWith("embed")) {
                    continue;
                }
                let items = key.split("-");
                if (items.length < 3) {
                    continue;
                }
                let index = Number.parseInt(items[items.length - 1]);
                if (Number.isNaN(index)) {
                    continue;
                }
                items.slice(0, -1);
                if (!embedOptions.has(index)) {
                    embedOptions.set(index, new Config_1.Options());
                }
                (_a = embedOptions.get(index)) === null || _a === void 0 ? void 0 : _a.set(items[1], value);
            }
            let embeds = [];
            let _c;
            for (let [_, embed] of embedOptions) {
                embeds.push(new discord_js_1.EmbedBuilder({
                    title: embed.get("title"),
                    description: embed.get("description"),
                    author: embed.has("authorname")
                        ? {
                            name: embed.get("authorname"),
                            url: embed.get("authorurl"),
                            iconURL: embed.get("authoricon"),
                        }
                        : undefined,
                    image: embed.has("image")
                        ? {
                            url: embed.get("image"),
                        }
                        : undefined,
                    thumbnail: embed.has("thumbnail")
                        ? {
                            url: embed.get("thumbnail"),
                        }
                        : undefined,
                    color: embed.has("color") ? (Number.isNaN((_c = Number.parseInt(embed.get("color")))) ? undefined : _c) : undefined,
                }));
            }
            let buttonOptions = new Map();
            for (let [key, value] of this.options) {
                if (!key.startsWith("button")) {
                    continue;
                }
                let items = key.split("-");
                if (items.length < 3) {
                    continue;
                }
                let index = Number.parseInt(items[items.length - 1]);
                if (Number.isNaN(index)) {
                    continue;
                }
                items.slice(0, -1);
                if (!buttonOptions.has(index)) {
                    buttonOptions.set(index, new Config_1.Options());
                }
                (_b = buttonOptions.get(index)) === null || _b === void 0 ? void 0 : _b.set(items[1], value);
            }
            let buttons = [];
            for (let [_, button] of buttonOptions) {
                buttons.push(new discord_js_1.ButtonBuilder({
                    label: button.get("label"),
                    style: button.has("style") ? (Number.isNaN((_c = Number.parseInt(button.get("style")))) ? 1 : _c) : 1,
                    custom_id: (_c = button.get("event"))
                        ? _c + "/" + message.id
                        : message.channel.id + "/" + message.id + " " + Math.random() * 999999,
                    url: button.get("url"),
                    emoji: {
                        name: button.get("emojiname"),
                        id: button.get("emojiid"),
                    },
                    disabled: button.has("disable"),
                    type: 2,
                }));
            }
            yield message.channel.send({
                content: this.options.get("content"),
                reply: this.options.has("reply")
                    ? {
                        messageReference: message,
                        failIfNotExists: false,
                    }
                    : undefined,
                embeds: embeds.length ? embeds : undefined,
                components: buttons.length ? [{ type: 1, components: buttons }] : undefined,
            });
        });
    }
}
exports.SayAction = SayAction;
