import { loadCommands } from "./commands.js";
import { ClientEvents, Client } from "discord.js";
import { Settings } from "types/settings.js";
import { errorPrefix, infoPrefix } from "./utils.js";
import { CommandNotFound, CommandsNotLoaded, SettingsNotLoaded } from "./errors.js";
import { Commands } from "types/commands.js";

let settings: Settings | null = null;
let commands: Commands | null = null;

async function interactionCreate(...[interaction]: ClientEvents["interactionCreate"]): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (settings == null) throw new SettingsNotLoaded();

    if (commands == null) throw new CommandsNotLoaded(interaction.commandName);

    if (!(interaction.commandName in commands)) throw new CommandNotFound(interaction.commandName);

    for (const action of commands[interaction.commandName].actions) {
        try {
            await action.run(interaction);
        } catch (err) {
            console.error(errorPrefix);
            console.error(err);
        }
    }
}

async function ready(..._args: ClientEvents["ready"]): Promise<void> {
    console.log(infoPrefix + "Bot is Ready!");
}

export async function loadSettings(_settings: Settings) {
    settings = _settings;

    commands = await loadCommands(_settings);

    console.log(infoPrefix + "Loaded settings");
}

export function registerEvents(client: Readonly<Client>) {
    client.on("interactionCreate", interactionCreate);
    client.on("ready", ready);
}
