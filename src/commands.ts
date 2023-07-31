import { ActionFunctions, Commands, Action } from "types/commands";
import { Settings, SettingsCommand } from "types/settings";
import { readdir as readDirectory } from "node:fs/promises";
import { infoPrefix, warnPrefix } from "./utils.js";

async function loadActionFunctions(): Promise<ActionFunctions> {
    const actionsFolder = await readDirectory("build/actions/");

    const actions: ActionFunctions = {};

    for (const actionFile of actionsFolder) {
        actions[actionFile.slice(0, -3)] = (await import(`./actions/${actionFile}`)).default.run;
    }

    return actions;
}

function getCommandActions(settingsCommandName: string, settingsCommand: SettingsCommand, actionFunctions: ActionFunctions) {
    const actions: Array<Action> = [];

    for (const settingsAction of settingsCommand.actions ?? []) {
        if (settingsAction.type == null) {
            console.warn(warnPrefix + `No type specified for action in command '${settingsCommandName}'. Skipping...`);

            continue;
        }

        if (!(settingsAction.type in actionFunctions)) {
            console.warn(warnPrefix + `Action of type '${settingsAction.type}' in command '${settingsCommandName}' doesn't exist. Skipping...`);

            continue;
        }

        actions.push({
            run: actionFunctions[settingsAction.type],
            rawBody: settingsAction,
        });
    }

    return actions;
}

export async function loadCommands(settings: Settings): Promise<Commands> {
    const commands: Commands = {};

    const actionFunctions = await loadActionFunctions();

    if (settings.commands == null) {
        console.warn(warnPrefix + "'commands' property not found in settings. No commands will be loaded!");

        return {};
    }

    for (const settingsCommandName in settings.commands) {
        const settingsCommand = settings.commands[settingsCommandName] ?? {};

        if (settingsCommand.actions == null) {
            console.warn(warnPrefix + `Command '${settingsCommandName}' has no actions`);
        }

        const actions = getCommandActions(settingsCommandName, settingsCommand, actionFunctions);

        commands[settingsCommandName] = {
            actions,
        };
    }

    let commandsCount = 0;
    for (const _ in commands) {
        commandsCount++;
    }

    console.log(infoPrefix + `Loaded ${commandsCount} command(s)`);

    return commands;
}
