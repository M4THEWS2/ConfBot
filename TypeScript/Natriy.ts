import { ButtonBuilder, Client, ComponentType, Message } from "discord.js";

import { BaseAction } from "./Actions/BaseAction";
import { Executable } from "./Executable";
import { Config, Options } from "./Config";

import { SayAction } from "./Actions/SayAction";
import { MacroAction } from "./Actions/MacroAction";
import { DelayAction } from "./Actions/DelayAction";
import { RepeatAction } from "./Actions/RepeatAction";

import EventEmitter from "events";
import { KickAction } from "./Actions/KickAction";

export class Natriy {
	private client: Client;
	private config: Config;
	private commands: Map<string, Executable>;
	private macros: Map<string, Executable>;
	private emitter: EventEmitter;
	private prefix: string;

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
			throw new Error("You must set at least the token option! Missing options section in config file!");
		}

		this.commands = new Map();
		this.macros = new Map();

		this.emitter = new EventEmitter();
		this.emitter.on("macro", (name: string, message: Message) => {
			this.runMacro(name, message);
		});

		if (!this.config.options?.has("prefix")) {
			this.prefix = "!";
			console.warn('Warn: No prefix in config file. Using "!".');
		} else {
			this.prefix = <string>this.config.options.get("prefix");
		}

		let commandList = this.config.getExecutables("commands");
		for (let [commandName, command] of commandList) {
			this.commands.set(commandName, new Executable(commandName, this.resolveActions(command.actions), command.options));
		}

		let macroList = this.config.getExecutables("macros");
		for (let [macroName, macro] of macroList) {
			this.macros.set(macroName, new Executable(macroName, this.resolveActions(macro.actions), macro.options, true));
		}

		this.client.on("ready", () => {
			let date = new Date();
			console.log(`Ready! ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`);
		});

		this.client.on("messageCreate", async (message) => {
			message.content = message.content.trimStart().trimEnd();

			if (!message.content.startsWith(this.prefix)) {
				return;
			}

			let command = message.content.slice(this.prefix.length).split(" ")[0];

			let log = await this.commands.get(command)?.execute(this.client, message, this.emitter);

			if (!log) {
				if (this.config.options?.has("command-not-found")) {
					this.runMacro(<string>this.config.options.get("command-not-found"), message);
				}
			} else {
				console.log(log.text);
			}
		});

		this.client.on("interactionCreate", async (interaction) => {
			if (interaction.isButton()) {
				let buttons: Array<ButtonBuilder> = [];
				for (let button of interaction.message.components[0].components) {
					if (button.type == ComponentType.Button) {
						buttons.push(new ButtonBuilder(button.data).setDisabled(true));
					}
				}

				interaction.update({
					components: [{ type: 1, components: buttons }],
				});

				let [eventName, messageId] = interaction.customId.split("/");

				messageId = messageId.split(" ")[0];

				if (!this.macros.has(eventName)) {
					return;
				}

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
		if (!this.config.options?.get("token")) {
			throw new Error("No token in configuration file!");
		}
		this.client.login(this.config.options?.get("token"));
	}

	private async runMacro(name: string, message: Message): Promise<void> {
		let log = await this.macros.get(name)?.execute(this.client, message, this.emitter);

		if (!log) {
			console.error(`Error: macro '${name}' does not exists.`);
		} else {
			if (this.config.options?.has("log-macro")) {
				console.log(log.text);
			}
		}
	}

	private resolveActions(actions: Array<Options>): Array<BaseAction> {
		let definedActions: Array<BaseAction> = [];

		for (let action of actions) {
			if (!action.has("type")) {
				continue;
			}

			let type = action.get("type");

			for (let t of this.typeTable) {
				if (t[0] == type) {
					definedActions.push(new t[1](action));
				}
			}
		}

		return definedActions;
	}
}
