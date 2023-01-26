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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const INIParser_1 = require("./INIParser");
const process_1 = require("process");
const readline_1 = require("readline");
const Bot_1 = require("./Bot");
const discordAPIBaseURL = 'https://discord.com/api';
const configFile = (0, INIParser_1.parseFile)('natriy.cfg');
const authorization = (_a = configFile.global.settings) === null || _a === void 0 ? void 0 : _a.token;
if (!authorization)
    throw new Error('Cannot find \'token\' in section settings');
function updateSlashCommands() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const appID = (_a = configFile.global.settings) === null || _a === void 0 ? void 0 : _a.appID;
        if (!appID)
            throw new Error('Cannot find \'appID\' in section settings');
        const defaultHeaders = {
            Authorization: `Bot ${authorization}`,
            'Content-Type': 'application/json'
        };
        let res;
        console.log('Retrieving commands...');
        try {
            res = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, { headers: defaultHeaders });
        }
        catch (_c) {
            console.warn('Failed retrieving commands');
            return;
        }
        if (!res.ok)
            throw new Error(`Failed retrieving commands with code: ${res.status}. Maybe your token is incorrect`);
        const resData = yield res.json();
        console.log(`Got ${resData.length} command(s)`);
        for (const command of resData) {
            try {
                res = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands/${command.id}`, {
                    method: 'DELETE',
                    headers: defaultHeaders
                });
            }
            catch (_d) {
                console.warn(`Failed deleting command ${command.name} (${command.id})`);
                continue;
            }
            if (res.status !== 204)
                console.warn(`Failed deleting command ${command.name} (${command.id}) with code: ${res.status} ${res.statusText}`);
            else
                console.log(`Deleted command successfully: ${command.name}`);
        }
        if (!configFile.global.commands)
            return;
        for (const commandName in configFile.global.commands.__children) {
            const command = configFile.global.commands.__children[commandName];
            try {
                res = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, {
                    method: 'POST',
                    headers: defaultHeaders,
                    body: JSON.stringify({
                        name: commandName,
                        description: (_b = command.description) !== null && _b !== void 0 ? _b : 'No description provided'
                    })
                });
            }
            catch (_e) {
                console.warn(`Got error trying to create command ${commandName}`);
                continue;
            }
            if (res.status === 201)
                console.log(`Created command successfully: ${commandName}`);
            else if (res.status === 200)
                console.warn(`Command already exists: ${commandName}`);
            else
                console.error(`Got error trying to create command '${commandName}' with code: ${res.status} ${res.statusText}`);
        }
    });
}
if (process_1.argv.length <= 2 && !module.children) {
    const completions = 'start update'.split(' ');
    function completer(line) {
        const hits = completions.filter((c) => c.startsWith(line));
        return [hits.length ? hits : completions, line];
    }
    const rl = (0, readline_1.createInterface)({ input: process_1.stdin, output: process_1.stdout, completer });
    rl.write("'1' --> Start Bot\n");
    rl.write("'2' --> Update commands\n");
    rl.on('line', (line) => {
        line = line.trim();
        if (line.startsWith('1') || line.startsWith('start'))
            (0, Bot_1.start)(configFile, authorization);
        else if (line.startsWith('2') || line.startsWith('update'))
            updateSlashCommands();
        else {
            rl.prompt();
            return;
        }
        rl.close();
    });
    rl.prompt();
}
else {
    if (process_1.argv[2] === 'update') {
        updateSlashCommands();
    }
    else
        (0, Bot_1.start)(configFile, authorization);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVDO0FBQ3ZDLHFDQUF3RTtBQUN4RSx1Q0FBMEM7QUFFMUMsK0JBQXlDO0FBRXpDLE1BQU0saUJBQWlCLEdBQUcseUJBQXlCLENBQUE7QUFDbkQsTUFBTSxVQUFVLEdBQUcsSUFBQSxxQkFBUyxFQUFDLFlBQVksQ0FBQyxDQUFBO0FBRTFDLE1BQU0sYUFBYSxHQUF1QixNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxLQUFLLENBQUE7QUFDM0UsSUFBSSxDQUFDLGFBQWE7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7QUFFaEYsU0FBZSxtQkFBbUI7OztRQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxLQUFLLENBQUE7UUFDL0MsSUFBSSxDQUFDLEtBQUs7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFFeEUsTUFBTSxjQUFjLEdBQUc7WUFDckIsYUFBYSxFQUFFLE9BQU8sYUFBYSxFQUFFO1lBQ3JDLGNBQWMsRUFBRSxrQkFBa0I7U0FDbkMsQ0FBQTtRQUVELElBQUksR0FBMkIsQ0FBQTtRQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFFckMsSUFBSTtZQUNGLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLGlCQUFpQixpQkFBaUIsS0FBSyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtTQUN0RztRQUFDLFdBQU07WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDMUMsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQUUs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