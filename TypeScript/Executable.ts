import { Client, Message } from "discord.js";
import { BaseAction } from "./Actions/BaseAction";
import EventEmitter from "events";
import { Options } from "./Config";

interface log {
	successful: boolean;
	text: string;
}

export class Executable {
	public name: string;
	public macro: boolean;
	private actions: Array<BaseAction>;

	constructor(name: string, actions: Array<BaseAction>, options: Options, macro: boolean = false) {
		this.name = name;
		this.actions = actions;
		this.macro = macro;
	}

	public async execute(client: Client, message: Message, emitter: EventEmitter): Promise<log> {
		let date = new Date();
		try {
			for (let action of this.actions) {
				await action.do(client, message, emitter);
			}

			return {
				successful: true,
				text: `${message.author.username} (${message.author.id}) executed '${this.name}'${
					this.macro ? " (macro)" : ""
				} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
			};
		} catch (err) {
			return {
				successful: true,
				text: `${message.author.username} (${message.author.id}) executed ${this.name}${
					this.macro ? " (macro)" : ""
				} and got error ${err} --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
			};
		}
	}
}
