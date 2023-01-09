import { Client, Message } from "discord.js";
import { Items } from "../main/INIParser";
import { BaseAction } from "./BaseAction";

export class SayAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}
	async do(bot: Client, message: Message): Promise<void> {
		await message.channel.send({
			content: this.options.content,
			reply:
				this.options.reply != null
					? {
						messageReference: message,
						failIfNotExists: false
					}
					: undefined,
		});
	}
}
