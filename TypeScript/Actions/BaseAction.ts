import { Client, Message } from "discord.js";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class BaseAction {
	protected readonly options: Items;

	constructor(options: Items) {
		this.options = options;
	}

	public async do(client: Client, message: Message, emitter?: EventEmitter): Promise<void> {}
}
