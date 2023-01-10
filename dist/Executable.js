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
class Executable {
    constructor(actions) {
        this.actions = actions;
    }
    execute(inter, client) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const action of this.actions) {
                yield action.do(inter, client);
            }
        });
    }
}
exports.Executable = Executable;
const actionsTable = {
    none: BaseAction_1.default,
    say: SayAction_1.default
};
function getExecutables(config, rootSection) {
    const executables = new Map();
    if (!config.global[rootSection])
        return executables;
    for (const executableName in config.global[rootSection].children) {
        const executable = config.global[rootSection].children[executableName];
        if (!executable.children.action)
            continue;
        const actions = [];
        for (const actionKey in executable.children.action.children) {
            const action = executable.children.action.children[actionKey];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlY3V0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9FeGVjdXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFxQztBQUdyQyxtREFBMkM7QUFFM0MsTUFBYSxVQUFVO0lBR3JCLFlBQWEsT0FBcUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDeEIsQ0FBQztJQUVLLE9BQU8sQ0FBRSxLQUFrQyxFQUFFLE1BQWM7O1lBQy9ELEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakMsTUFBTSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTthQUMvQjtRQUNILENBQUM7S0FBQTtDQUNGO0FBWkQsZ0NBWUM7QUFFRCxNQUFNLFlBQVksR0FBeUM7SUFDekQsSUFBSSxFQUFFLG9CQUFVO0lBQ2hCLEdBQUcsRUFBRSxtQkFBUztDQUNmLENBQUE7QUFFRCxTQUFnQixjQUFjLENBQUUsTUFBZSxFQUFFLFdBQW1CO0lBQ2xFLE1BQU0sV0FBVyxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBRXRELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUFFLE9BQU8sV0FBVyxDQUFBO0lBRW5ELEtBQUssTUFBTSxjQUFjLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDaEUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7UUFFdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUFFLFNBQVE7UUFFekMsTUFBTSxPQUFPLEdBQWlCLEVBQUUsQ0FBQTtRQUNoQyxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUMzRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLGNBQWMsV0FBVyxTQUFTLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RSxTQUFRO2FBQ1Q7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsY0FBYyxXQUFXLFNBQVMsRUFBRSxDQUFDLENBQUE7Z0JBQzdFLFNBQVE7YUFDVDtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDNUQ7UUFFRCxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0tBQ3pEO0lBRUQsT0FBTyxXQUFXLENBQUE7QUFDcEIsQ0FBQztBQS9CRCx3Q0ErQkM7QUFFRCxrQkFBZSxVQUFVLENBQUEifQ==