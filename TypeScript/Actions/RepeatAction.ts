import { Client, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class RepeatAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		let _m: string | undefined;
		if (!(_m = this.options.get("macro"))) {
			throw new Error("repeat action needs 'macro' option!");
		}

		let _t: string | undefined;
		if (!(_t = this.options.get("times"))) {
			throw new Error("repeat action needs 'times' option!");
		}

		const _c: number = Number.parseInt(_t);
		if (Number.isNaN(_c)) {
			return;
		}

		for (let i = 0; i < _c; i++) {
			emitter.emit("macro", _m, message);
		}
	}
}
