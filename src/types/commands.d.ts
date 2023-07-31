import { ChatInputCommandInteraction } from "discord.js";

export type ActionRun = (
    interaction: ChatInputCommandInteraction
) => Promise<void>;

export interface Action {
    run: ActionRun;
    rawBody: object;
}

export interface ActionFunctions {
    [name: string]: ActionRun;
}

export interface Command {
    actions: Array<Action>;
}

export interface Commands {
    [name: string]: Command;
}
