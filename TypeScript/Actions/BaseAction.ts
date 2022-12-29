import { Client, Message } from "discord.js";
import { Options } from "../Config";
import EventEmitter from "events";

export class BaseAction {
	options: Options;

	constructor(options: Options) {
		this.options = options;
	}

	public async do(client: Client, message: Message, emitter?: EventEmitter): Promise<void> {}
}
