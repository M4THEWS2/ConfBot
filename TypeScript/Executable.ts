import { ChannelType, Client, Message } from "discord.js";
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
	private options: Options;

	constructor(name: string, actions: Array<BaseAction>, options: Options, macro: boolean = false) {
		this.name = name;
		this.actions = actions;
		this.macro = macro;
		this.options = options;
	}

	public async execute(client: Client, message: Message, emitter: EventEmitter): Promise<log> {
		let date = new Date();

		let _c: string | undefined;
		if ((_c = this.options.get("allowedchannels"))) {
			if (
				(_c == "whitelist" && !this.options.getArray("channel-id").includes(message.channelId)) ||
				(_c == "blacklist" && this.options.getArray("channel-id").includes(message.channelId))
			) {
				return {
					successful: false,
					text: `${message.author.username} (${message.author.id}) tried to execute '${this.name}'${
						this.macro ? " (macro)" : ""
					} in a prohibited channel: '${message.channel.type == ChannelType.GuildText ? message.channel.name : "Could not get name"}' (${
						message.channelId
					}) --> ${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`,
				};
			}
		}

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
