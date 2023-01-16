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
exports.getExecutables = exports.Executable = void 0;
const BaseAction_1 = require("./BaseAction");
const SayAction_1 = require("./actions/SayAction");
const DelayAction_1 = require("./actions/DelayAction");
const MacroAction_1 = require("./actions/MacroAction");
class Executable {
    constructor(actions) {
        this.actions = actions;
    }
    execute(inter, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const action of this.actions) {
                    yield action.do(inter, client);
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.Executable = Executable;
const actionsTable = {
    none: BaseAction_1.default,
    say: SayAction_1.default,
    delay: DelayAction_1.default,
    macro: MacroAction_1.default
};
function getExecutables(config, rootSection) {
    const executables = new Map();
    if (!config.global[rootSection])
        return executables;
    for (const executableName in config.global[rootSection].__children) {
        const executable = config.global[rootSection].__children[executableName];
        if (!executable.__children.action)
            continue;
        const actions = [];
        for (const actionKey in executable.__children.action.__children) {
            const action = executable.__children.action.__children[actionKey];
            if (!action.type) {
                console.warn(`Missing type in action: ${executableName}.action.${actionKey}`);
                continue;
            }
            if (!actionsTable[action.type]) {
                console.warn(`Invalid type in action: ${executableName}.action.${actionKey}`);
                continue;
            }
            actions.push(new actionsTable[action.type](action));
        }
        executables.set(executableName, new Executable(actions));
    }
    return executables;
}
exports.getExecutables = getExecutables;
exports.default = Executable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlY3V0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9FeGVjdXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFxQztBQUdyQyxtREFBMkM7QUFDM0MsdURBQStDO0FBQy9DLHVEQUErQztBQUUvQyxNQUFhLFVBQVU7SUFHckIsWUFBYSxPQUFxQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN4QixDQUFDO0lBRUssT0FBTyxDQUFFLEtBQWtCLEVBQUUsTUFBYzs7WUFDL0MsSUFBSTtnQkFDRixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7aUJBQy9CO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25CO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFoQkQsZ0NBZ0JDO0FBRUQsTUFBTSxZQUFZLEdBQXlDO0lBQ3pELElBQUksRUFBRSxvQkFBVTtJQUNoQixHQUFHLEVBQUUsbUJBQVM7SUFDZCxLQUFLLEVBQUUscUJBQVc7SUFDbEIsS0FBSyxFQUFFLHFCQUFXO0NBQ25CLENBQUE7QUFFRCxTQUFnQixjQUFjLENBQUUsTUFBZSxFQUFFLFdBQW1CO0lBQ2xFLE1BQU0sV0FBVyxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBRXRELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUFFLE9BQU8sV0FBVyxDQUFBO0lBRW5ELEtBQUssTUFBTSxjQUFjLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDbEUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUE7UUFFeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUFFLFNBQVE7UUFFM0MsTUFBTSxPQUFPLEdBQWlCLEVBQUUsQ0FBQTtRQUNoQyxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMvRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLGNBQWMsV0FBVyxTQUFTLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RSxTQUFRO2FBQ1Q7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsY0FBYyxXQUFXLFNBQVMsRUFBRSxDQUFDLENBQUE7Z0JBQzdFLFNBQVE7YUFDVDtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDNUQ7UUFFRCxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0tBQ3pEO0lBRUQsT0FBTyxXQUFXLENBQUE7QUFDcEIsQ0FBQztBQS9CRCx3Q0ErQkM7QUFFRCxrQkFBZSxVQUFVLENBQUEifQ==