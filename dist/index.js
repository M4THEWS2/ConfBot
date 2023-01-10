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
const node_process_1 = require("node:process");
const node_readline_1 = require("node:readline");
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
        console.log('Retrieving commands...');
        const res = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, { headers: defaultHeaders });
        if (!res.ok)
            throw new Error(`Failed retrieving commands with code: ${res.status}. Maybe your token is incorrect`);
        const resData = yield res.json();
        console.log(`Got ${resData.length} command(s)`);
        for (const command of resData) {
            const { status, statusText } = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands/${command.id}`, {
                method: 'DELETE',
                headers: defaultHeaders
            });
            if (status !== 204)
                console.warn(`Failed deleting command ${command.name} (${command.id}) with code: ${status} ${statusText}`);
            else
                console.log(`Deleted command successfully: ${command.name}`);
        }
        if (!configFile.global.commands)
            return;
        for (const commandName in configFile.global.commands.__children) {
            const command = configFile.global.commands.__children[commandName];
            const { status, statusText } = yield fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({
                    name: commandName,
                    description: (_b = command.description) !== null && _b !== void 0 ? _b : ''
                })
            });
            if (status === 201)
                console.log(`Created command successfully: ${commandName}`);
            else if (status === 200)
                console.warn(`Command already exists: ${commandName}`);
            else
                console.error(`Got error trying to create command '${commandName}' with code: ${status} ${statusText}`);
        }
    });
}
if (node_process_1.argv.length <= 2) {
    const completions = 'start update'.split(' ');
    function completer(line) {
        const hits = completions.filter((c) => c.startsWith(line));
        return [hits.length ? hits : completions, line];
    }
    const rl = (0, node_readline_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout, completer });
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
    if (node_process_1.argv[2] === 'update') {
        updateSlashCommands();
    }
    else
        (0, Bot_1.start)(configFile, authorization);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVDO0FBQ3ZDLCtDQUE2RTtBQUM3RSxpREFBK0M7QUFFL0MsK0JBQXlDO0FBRXpDLE1BQU0saUJBQWlCLEdBQUcseUJBQXlCLENBQUE7QUFDbkQsTUFBTSxVQUFVLEdBQUcsSUFBQSxxQkFBUyxFQUFDLFlBQVksQ0FBQyxDQUFBO0FBRTFDLE1BQU0sYUFBYSxHQUF1QixNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxLQUFLLENBQUE7QUFDM0UsSUFBSSxDQUFDLGFBQWE7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7QUFFaEYsU0FBZSxtQkFBbUI7OztRQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSwwQ0FBRSxLQUFLLENBQUE7UUFDL0MsSUFBSSxDQUFDLEtBQUs7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFFeEUsTUFBTSxjQUFjLEdBQUc7WUFDckIsYUFBYSxFQUFFLE9BQU8sYUFBYSxFQUFFO1lBQ3JDLGNBQWMsRUFBRSxrQkFBa0I7U0FDbkMsQ0FBQTtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLGlCQUFpQixpQkFBaUIsS0FBSyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUUzRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxHQUFHLENBQUMsTUFBTSxpQ0FBaUMsQ0FBQyxDQUFBO1FBRWxILE1BQU0sT0FBTyxHQUF5QixNQUFNLEdBQUcsQ0FBQyxJQUFJ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