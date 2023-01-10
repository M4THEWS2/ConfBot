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
exports.start = void 0;
const discord_js_1 = require("discord.js");
const Executable_1 = require("./Executable");
function start(config, token) {
    const bot = new discord_js_1.Client({
        intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'GuildBans', 'MessageContent']
    });
    const commands = (0, Executable_1.getExecutables)(config, 'commands');
    bot.on('ready', () => {
        console.log('Bot is ready!');
    });
    bot.on('interactionCreate', (inter) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (inter.type === discord_js_1.InteractionType.ApplicationCommand && inter.commandType === discord_js_1.ApplicationCommandType.ChatInput) {
            if (commands.has(inter.commandName)) {
                yield ((_a = commands.get(inter.commandName)) === null || _a === void 0 ? void 0 : _a.execute(inter, bot));
            }
        }
    }));
    bot.login(token);
}
exports.start = start;
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNEU7QUFDNUUsNkNBQXlEO0FBR3pELFNBQWdCLEtBQUssQ0FBRSxNQUFlLEVBQUUsS0FBYTtJQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFNLENBQUM7UUFDckIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFDO0tBQ3BGLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUE0QixJQUFBLDJCQUFjLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBRTVFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFOztRQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssNEJBQWUsQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLG1DQUFzQixDQUFDLFNBQVMsRUFBRTtZQUMvRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsMENBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFBO2FBQzNEO1NBQ0Y7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNsQixDQUFDO0FBcEJELHNCQW9CQztBQUVELGtCQUFlLEtBQUssQ0FBQSJ9