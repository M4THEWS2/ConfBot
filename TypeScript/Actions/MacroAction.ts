import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class MacroAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		const _m: string | undefined = this.options.get("macro");
		if (!_m) {
			throw new Error("macro action needs 'macro' option!");
		}
		emitter.emit("macro", _m, message);
	}
}
