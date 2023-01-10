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
class SayAction extends BaseAction_1.default {
    do(inter, client) {
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
            yield inter.reply({
                content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined,
                embeds: embed ? [embed] : undefined
            });
        });
    }
}
exports.SayAction = SayAction;
exports.default = SayAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2F5QWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvU2F5QWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFzQztBQUV0QyxNQUFhLFNBQVUsU0FBUSxvQkFBVTtJQUNqQyxFQUFFLENBQUUsS0FBa0MsRUFBRSxNQUFjOztZQUMxRCxJQUFJLEtBQTJCLENBQUE7WUFFL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLEtBQUssR0FBRyxFQUFFLENBQUE7Z0JBQ1YsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFBO2dCQUVsRCxLQUFLLENBQUMsTUFBTSxHQUF1QixZQUFZLENBQUMsYUFBYSxDQUFDO29CQUM1RCxDQUFDLENBQUM7d0JBQ0UsSUFBSSxFQUFVLFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3pDLFFBQVEsRUFBc0IsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDekQsR0FBRyxFQUFzQixZQUFZLENBQUMsWUFBWSxDQUFDO3FCQUNwRDtvQkFDSCxDQUFDLENBQUMsU0FBUyxDQUFBO2dCQUNiLEtBQUssQ0FBQyxLQUFLLEdBQXVCLFlBQVksQ0FBQyxLQUFLLENBQUE7Z0JBQ3BELEtBQUssQ0FBQyxXQUFXLEdBQXVCLFlBQVksQ0FBQyxXQUFXLENBQUE7Z0JBQ2hFLEtBQUssQ0FBQyxLQUFLLEdBQXVCLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFVLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO2dCQUN0RyxLQUFLLENBQUMsU0FBUyxHQUF1QixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBVSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtnQkFDbEgsS0FBSyxDQUFDLEtBQUssR0FBdUIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQVUsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7Z0JBQ3RHLEtBQUssQ0FBQyxHQUFHLEdBQXVCLFlBQVksQ0FBQyxHQUFHLENBQUE7Z0JBQ2hELEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7YUFDMUY7WUFFRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2pJLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDcEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUE3QkQsOEJBNkJDO0FBRUQsa0JBQWUsU0FBUyxDQUFBIn0=