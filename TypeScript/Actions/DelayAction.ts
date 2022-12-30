import { Client, Message } from "discord.js";
import { Items } from "../Config";
import { BaseAction } from "./BaseAction";

export class DelayAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message): Promise<void> {
		return new Promise<void>((res) => {
			let _c: number;
			setTimeout(
				() => {
					res();
				},
				this.options.has("time") ? (Number.isNaN((_c = Number.parseFloat(<string>this.options.get("time")))) ? 5000 : _c) : 5000
			);
		});
	}
}
