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
    const macros = (0, Executable_1.getExecutables)(config, 'macros');
    bot.on('ready', () => {
        console.log('Bot is ready!');
    });
    bot.on('interactionCreate', (inter) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (inter.type === discord_js_1.InteractionType.ApplicationCommand && inter.commandType === discord_js_1.ApplicationCommandType.ChatInput) {
            yield ((_a = commands.get(inter.commandName)) === null || _a === void 0 ? void 0 : _a.execute(inter, bot));
        }
        else if (inter.type === discord_js_1.InteractionType.MessageComponent) {
            const interArgs = inter.customId.split('/');
            const macroName = interArgs[0];
            yield ((_b = macros.get(macroName)) === null || _b === void 0 ? void 0 : _b.execute(inter, bot));
            if (inter.isButton() && interArgs[2] === '1') {
                const newComponents = Object.assign({}, inter.message.components)[0].toJSON();
                for (const component of newComponents.components) {
                    if (component.type === 2) {
                        component.disabled = true;
                    }
                }
                yield inter.message.edit({ components: [newComponents] });
            }
        }
    }));
    bot.on('macro', (macroName, inter) => __awaiter(this, void 0, void 0, function* () {
        var _c;
        yield ((_c = macros.get(macroName)) === null || _c === void 0 ? void 0 : _c.execute(inter, bot));
    }));
    bot.login(token);
}
exports.start = start;
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUY7QUFDekYsNkNBQXlEO0FBR3pELFNBQWdCLEtBQUssQ0FBRSxNQUFlLEVBQUUsS0FBYTtJQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFNLENBQUM7UUFDckIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFDO0tBQ3BGLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUE0QixJQUFBLDJCQUFjLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sTUFBTSxHQUE0QixJQUFBLDJCQUFjLEVBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRXhFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFOztRQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssNEJBQWUsQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLG1DQUFzQixDQUFDLFNBQVMsRUFBRTtZQUMvRyxNQUFNLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsMENBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFBO1NBQzNEO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLDRCQUFlLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0MsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTlCLE1BQU0sQ0FBQSxNQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQTtZQUVoRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUM1QyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO2dCQUU3RSxLQUFLLE1BQU0sU0FBUyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7b0JBQ2hELElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7d0JBQ3hCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO3FCQUMxQjtpQkFDRjtnQkFFRCxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQzFEO1NBQ0Y7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxTQUFpQixFQUFFLEtBQWtCLEVBQUUsRUFBRTs7UUFDOUQsTUFBTSxDQUFBLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsMENBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFBO0lBQ2xELENBQUMsQ0FBQSxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2xCLENBQUM7QUF4Q0Qsc0JBd0NDO0FBRUQsa0JBQWUsS0FBSyxDQUFBIn0=