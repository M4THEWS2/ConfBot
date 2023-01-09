import { Client, Message } from "discord.js";
import { BaseAction } from "../actions/BaseAction.js";
import { SayAction } from "../actions/SayAction.js";
import { Section, Sections } from "./INIParser.js";

export class Executable {
	readonly name: string;
	private readonly actions: BaseAction[];

	constructor(name: string, actions: BaseAction[]) {
		this.name = name;
		this.actions = actions;
	}

	async execute(bot: Client, message: Message): Promise<void> {
		for (const action of this.actions) {
			await action.do(bot, message);
		}
	}
}

const actionTypeTable: { [key: string]: typeof BaseAction } = {
	none: BaseAction,
	say: SayAction,
};

export function loadExecutables(rootSection: Section): Executable[] {
	if (!rootSection.subsections) return [];

	const executables: Executable[] = [];

	for (const executable in rootSection.subsections) {
		if (!rootSection.subsections[executable].subsections) continue;
		if (!rootSection.subsections[executable].subsections?.action?.subsections) continue;

		const actionSections = <Sections>rootSection.subsections[executable].subsections?.action.subsections;

		const actions: BaseAction[] = [];
		for (const action in actionSections) {
			const actionSection = actionSections[action];

			if (!actionSection.items || !actionSection.items.type) continue;

			if (actionTypeTable[actionSection.items.type]) actions.push(new actionTypeTable[actionSection.items.type](actionSection.items));
		}

		executables.push(new Executable(executable, actions));
	}

	return executables;
}
