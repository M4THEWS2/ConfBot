import { ChannelType, Client, Message } from "discord.js";
import { BaseAction } from "./Actions/BaseAction";
import { Items } from "./Config";
import { EventEmitter } from "events";
interface log {
	successful: boolean;
	text: string;
}

export class Executable {
	public readonly name: string;
	public readonly macro: boolean;
	private readonly actions: Array<BaseAction>;
	private readonly options: Items;

	constructor(name: string, actions: Array<BaseAction>, options: Items, macro: boolean = false) {
		this.name = name;
		this.actions = actions;
		this.macro = macro;
		this.options = options;
	}

	public async execute(client: Client, message: Message, emitter: EventEmitter): Promise<log> {
		const date = new Date();

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
			for (const action of this.actions) {
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
