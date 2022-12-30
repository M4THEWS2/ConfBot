import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class MacroAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		const _m = this.options.has("macro");
		if (!_m) {
			throw new Error("Macro action needs 'macro' option!");
		}
		emitter.emit("macro", _m, message);
	}
}
