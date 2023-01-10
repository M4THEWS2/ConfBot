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
    say: SayAction_1.default
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlY3V0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9FeGVjdXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFxQztBQUdyQyxtREFBMkM7QUFFM0MsTUFBYSxVQUFVO0lBR3JCLFlBQWEsT0FBcUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDeEIsQ0FBQztJQUVLLE9BQU8sQ0FBRSxLQUFrQyxFQUFFLE1BQWM7O1lBQy9ELElBQUk7Z0JBQ0YsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNqQyxNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUMvQjthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNuQjtRQUNILENBQUM7S0FBQTtDQUNGO0FBaEJELGdDQWdCQztBQUVELE1BQU0sWUFBWSxHQUF5QztJQUN6RCxJQUFJLEVBQUUsb0JBQVU7SUFDaEIsR0FBRyxFQUFFLG1CQUFTO0NBQ2YsQ0FBQTtBQUVELFNBQWdCLGNBQWMsQ0FBRSxNQUFlLEVBQUUsV0FBbUI7SUFDbEUsTUFBTSxXQUFXLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUE7SUFFdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQUUsT0FBTyxXQUFXLENBQUE7SUFFbkQsS0FBSyxNQUFNLGNBQWMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsRUFBRTtRQUNsRSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUV4RSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQUUsU0FBUTtRQUUzQyxNQUFNLE9BQU8sR0FBaUIsRUFBRSxDQUFBO1FBQ2hDLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUVqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsY0FBYyxXQUFXLFNBQVMsRUFBRSxDQUFDLENBQUE7Z0JBQzdFLFNBQVE7YUFDVDtZQUVELElBQUksQ0FBQyxZQUFZLENBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixjQUFjLFdBQVcsU0FBUyxFQUFFLENBQUMsQ0FBQTtnQkFDN0UsU0FBUTthQUNUO1lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtTQUM1RDtRQUVELFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7S0FDekQ7SUFFRCxPQUFPLFdBQVcsQ0FBQTtBQUNwQixDQUFDO0FBL0JELHdDQStCQztBQUVELGtCQUFlLFVBQVUsQ0FBQSJ9