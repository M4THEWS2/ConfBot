import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import EventEmitter from "events";
import { Options } from "../Config";

export class MacroAction extends BaseAction {
	constructor(options: Options) {
		super(options);
	}

	public async do(client: Client<boolean>, message: Message<boolean>, emitter: EventEmitter): Promise<void> {
		if (!this.options.has("macro")) {
			throw new Error("Macro action needs macro option!");
		}
		emitter.emit("macro", <string>this.options.get("macro"), message);
	}
}
