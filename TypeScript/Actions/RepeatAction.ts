import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import EventEmitter from "events";
import { Options } from "../Config";

export class RepeatAction extends BaseAction {
	constructor(options: Options) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		if (!this.options.has("macro")) {
			throw new Error("Repeat action needs macro option!");
		}

		if (!this.options.has("times")) {
			throw new Error("Repeat action needs times option!");
		}

		const _c: number = Number.parseInt(<string>this.options.get("times"));
		if (Number.isNaN(_c)) {
			return;
		}

		for (let i = 0; i < _c; i++) {
			emitter.emit("macro", <string>this.options.get("macro"), message);
		}
	}
}
