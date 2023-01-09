import { Client, Message } from "discord.js";
import { Items } from "../main/INIParser";

export class BaseAction {
	protected readonly options: Items;
	constructor(options: Items) {
		this.options = options;
	}
	async do(bot: Client, message: Message): Promise<void> {
		console.warn("Warn: executed action of type 'none'.");
	}
}
