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
            if (!commands.has(inter.commandName))
                return;
            yield ((_a = commands.get(inter.commandName)) === null || _a === void 0 ? void 0 : _a.execute(inter, bot));
        }
        else if (inter.type === discord_js_1.InteractionType.MessageComponent) {
            const interArgs = inter.customId.split('/');
            if (interArgs.length < 3)
                return;
            const macroName = interArgs[0];
            if (macros.has(macroName))
                yield ((_b = macros.get(macroName)) === null || _b === void 0 ? void 0 : _b.execute(inter, bot));
            if (interArgs[2] !== '0') {
                const newComponents = inter.message.components[0].toJSON();
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
        if (!macroName)
            return;
        if (!macros.has(macroName))
            return;
        yield ((_c = macros.get(macroName)) === null || _c === void 0 ? void 0 : _c.execute(inter, bot));
    }));
    bot.login(token);
}
exports.start = start;
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUY7QUFDekYsNkNBQXlEO0FBR3pELFNBQWdCLEtBQUssQ0FBRSxNQUFlLEVBQUUsS0FBYTtJQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFNLENBQUM7UUFDckIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFDO0tBQ3BGLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUE0QixJQUFBLDJCQUFjLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sTUFBTSxHQUE0QixJQUFBLDJCQUFjLEVBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRXhFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFOztRQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssNEJBQWUsQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLG1DQUFzQixDQUFDLFNBQVMsRUFBRTtZQUMvRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2dCQUFFLE9BQU07WUFDNUMsTUFBTSxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQTtTQUMzRDthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyw0QkFBZSxDQUFDLGdCQUFnQixFQUFFO1lBQzFELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzNDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE9BQU07WUFFaEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTlCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQUUsTUFBTSxDQUFBLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsMENBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFBO1lBRTNFLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDeEIsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBRTFELEtBQUssTUFBTSxTQUFTLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtvQkFDaEQsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTt3QkFDeEIsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7cUJBQzFCO2lCQUNGO2dCQUVELE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7YUFDMUQ7U0FDRjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFPLFNBQWlCLEVBQUUsS0FBa0IsRUFBRSxFQUFFOztRQUM5RCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU07UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQUUsT0FBTTtRQUNsQyxNQUFNLENBQUEsTUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQywwQ0FBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBLENBQUE7SUFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbEIsQ0FBQztBQTdDRCxzQkE2Q0M7QUFFRCxrQkFBZSxLQUFLLENBQUEifQ==