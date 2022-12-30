import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class MacroAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		if (!this.options.has("macro")) {
			throw new Error("Macro action needs 'macro' option!");
		}
		emitter.emit("macro", <string>this.options.get("macro"), message);
	}
}
