import { ButtonBuilder, Client, ComponentType, Message } from "discord.js";

import { BaseAction } from "./Actions/BaseAction";
import { Executable } from "./Executable";
import { Config, Items } from "./Config";

import { SayAction } from "./Actions/SayAction";
import { MacroAction } from "./Actions/MacroAction";
import { DelayAction } from "./Actions/DelayAction";
import { RepeatAction } from "./Actions/RepeatAction";
import { KickAction } from "./Actions/KickAction";

import { EventEmitter } from "events";

export class Natriy {
	private readonly client: Client;
	private readonly config: Config;
	private readonly commands: Map<string, Executable>;
	private readonly macros: Map<string, Executable>;
	private readonly emitter: EventEmitter;
	private readonly prefix: string;

	private typeTable: Array<[string, typeof BaseAction]> = [
		["say", SayAction],
		["macro", MacroAction],
		["delay", DelayAction],
		["repeat", RepeatAction],
		["kick", KickAction],
	];

	constructor(configPath: string) {
		this.client = new Client({
			intents: ["Guilds", "GuildBans", "GuildMembers", "GuildMessages", "MessageContent"],
		});

		this.config = new Config(configPath);
		if (!this.config.options) {
			throw new Error("you must set at least the 'token' option! Missing options section in config file!");
		}

		this.commands = new Map();
		this.macros = new Map();

		this.emitter = new EventEmitter();
		this.emitter.on("macro", (name: string, message: Message) => {
			this.runMacro(name, message);
		});

		let _c: string | undefined;
		if (!(_c = this.config.options?.get("prefix"))) {
			this.prefix = "!";
			console.warn('No prefix in config file. Using "!".');
		} else {
			this.prefix = _c;
		}

		const commandList = this.config.getExecutables("commands");
		for (const [commandName, command] of commandList) {
			this.commands.set(commandName, new Executable(commandName, this.resolveActions(command.actions), command.options));
		}

		const macroList = this.config.getExecutables("macros");
		for (const [macroName, macro] of macroList) {
			this.macros.set(macroName, new Executable(macroName, this.resolveActions(macro.actions), macro.options, true));
		}

		this.client.on("ready", () => {
			const date = new Date();
			console.log(`Ready! ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`);
		});

		this.client.on("messageCreate", async (message) => {
			message.content = message.content.trimStart().trimEnd();

			if (!message.content.startsWith(this.prefix)) {
				return;
			}

			const command = message.content.split(" ")[0].slice(this.prefix.length);

			const log = await this.commands.get(command)?.execute(this.client, message, this.emitter);

			if (!log) {
				if ((_c = this.config.options?.get("command-not-found"))) {
					this.runMacro(_c, message);
				}
			} else {
				console.log(log.text);
			}
		});

		this.client.on("interactionCreate", async (interaction) => {
			if (interaction.isButton()) {
				const buttons: Array<ButtonBuilder> = [];
				for (const button of interaction.message.components[0].components) {
					if (button.type == ComponentType.Button) {
						buttons.push(new ButtonBuilder(button.data).setDisabled(true));
					}
				}

				interaction.update({
					components: [{ type: 1, components: buttons }],
				});

				let [eventName, messageId] = interaction.customId.split("/");

				messageId = messageId.split(" ")[0];

				interaction.channel?.messages
					.fetch(messageId)
					.then((message) => {
						this.runMacro(eventName, message);
					})
					.catch(() => {
						this.runMacro(eventName, interaction.message);
					});
			}
		});
	}

	public async login(): Promise<void> {
		let _c: string | undefined;
		if (!(_c = this.config.options?.get("token"))) {
			throw new Error("no token in configuration file!");
		}
		this.client.login(_c);
	}

	private async runMacro(name: string, message: Message): Promise<void> {
		const log = await this.macros.get(name)?.execute(this.client, message, this.emitter);

		if (!log) {
			console.warn(`Macro '${name}' does not exists.`);
		} else {
			if (this.config.options?.has("log-macro")) {
				console.log(log.text);
			}
		}
	}

	private resolveActions(actions: Array<Items>): Array<BaseAction> {
		const definedActions: Array<BaseAction> = [];

		let _c: string | undefined;
		for (const action of actions) {
			if (!(_c = action.get("type"))) {
				throw new Error("action requires option 'type'.");
			}

			const type = _c;

			for (const [actionName, actionClass] of this.typeTable) {
				if (actionName == type) {
					definedActions.push(new actionClass(action));
				}
			}
		}

		return definedActions;
	}
}
