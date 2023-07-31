import { RESTPostAPIChatInputApplicationCommandsJSONBody as JSONSlashCommandBody } from "discord.js";

interface BaseSettingsAction {
    type: string;
}

export type SettingsAction = Readonly<Partial<BaseSettingsAction>>;

interface BaseSettingsCommand extends JSONSlashCommandBody {
    actions: Array<SettingsAction>;
}

export type SettingsCommand = Readonly<Partial<BaseSettingsCommand>>;

interface BaseSettingsCommands {
    [name: string]: SettingsCommand;
}

export type SettingsCommands = Readonly<Partial<BaseSettingsCommands>>;

interface BaseSettings {
    token: string;
    application: string;
    commands: SettingsCommands;
}

export type Settings = Readonly<Partial<BaseSettings>>;
