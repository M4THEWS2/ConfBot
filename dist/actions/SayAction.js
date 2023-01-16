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
const BaseAction_1 = require("../BaseAction");
const node_buffer_1 = require("node:buffer");
function generateRandomID() {
    const strBuffer = node_buffer_1.Buffer.allocUnsafe(20);
    for (let i = 0; i < 20; i++) {
        let charCode = 32 + Math.floor(Math.random() * 94);
        if (charCode === 47)
            charCode++;
        strBuffer[i] = charCode;
    }
    return strBuffer.toString('ascii');
}
class SayAction extends BaseAction_1.default {
    do(inter) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let embed;
            if (this.options.__children.embed) {
                embed = {};
                const embedOptions = this.options.__children.embed;
                embed.author = embedOptions['author-name']
                    ? {
                        name: embedOptions['author-name'],
                        icon_url: embedOptions['author-icon'],
                        url: embedOptions['author-url']
                    }
                    : undefined;
                embed.title = embedOptions.title;
                embed.description = embedOptions.description;
                embed.image = embedOptions.image ? { url: embedOptions.image } : undefined;
                embed.thumbnail = embedOptions.thumbnail ? { url: embedOptions.thumbnail } : undefined;
                embed.video = embedOptions.video ? { url: embedOptions.video } : undefined;
                embed.url = embedOptions.url;
                embed.timestamp = embedOptions.timestamp != null ? (new Date()).toISOString() : undefined;
            }
            let components;
            if (this.options.__children.component) {
                components = { type: 1, components: [] };
                for (const componentKey in this.options.__children.component.__children) {
                    const component = this.options.__children.component.__children[componentKey];
                    if (!component.type) {
                        console.warn(`Missing type in component '${componentKey}'`);
                    }
                    if (component.type === 'button') {
                        const button = {
                            label: component.label,
                            type: 2,
                            custom_id: `${component.macro ? component.macro : inter.channelId}/${generateRandomID()}/${component['disable-all'] != null ? '1' : '0'}`,
                            style: component.style ? ((_a = Number.parseInt(component.style)) !== null && _a !== void 0 ? _a : 1) : 1,
                            disabled: component.disabled != null,
                            url: component.style === '5' ? component.url : undefined
                        };
                        components.components.push(button);
                    }
                }
            }
            const messageOptions = {
                content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined,
                embeds: embed ? [embed] : undefined,
                components: components ? [components] : undefined
            };
            if (!inter.isChatInputCommand()) {
                if (inter.isRepliable())
                    yield inter.reply(messageOptions);
                return;
            }
            if (inter.deferred)
                yield inter.editReply(messageOptions);
            else if (inter.replied)
                yield inter.followUp(messageOptions);
            else
                yield inter.reply(messageOptions);
        });
    }
}
exports.SayAction = SayAction;
exports.default = SayAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2F5QWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvU2F5QWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFzQztBQUN0Qyw2Q0FBb0M7QUFFcEMsU0FBUyxnQkFBZ0I7SUFDdkIsTUFBTSxTQUFTLEdBQUcsb0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixJQUFJLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxRQUFRLEtBQUssRUFBRTtZQUFFLFFBQVEsRUFBRSxDQUFBO1FBRS9CLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7S0FDeEI7SUFFRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUVELE1BQWEsU0FBVSxTQUFRLG9CQUFVO0lBQ2pDLEVBQUUsQ0FBRSxLQUFrQjs7O1lBQzFCLElBQUksS0FBMkIsQ0FBQTtZQUUvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDakMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtnQkFDVixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUE7Z0JBRWxELEtBQUssQ0FBQyxNQUFNLEdBQXVCLFlBQVksQ0FBQyxhQUFhLENBQUM7b0JBQzVELENBQUMsQ0FBQzt3QkFDRSxJQUFJLEVBQVUsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDekMsUUFBUSxFQUFzQixZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN6RCxH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