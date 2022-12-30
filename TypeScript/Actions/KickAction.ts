import { Client, GuildMember, Message } from "discord.js";
import { BaseAction } from "./BaseAction";
import { Items } from "../Config";
import { EventEmitter } from "events";

export class KickAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message, emitter: EventEmitter): Promise<void> {
		if (!this.options.get("member")) {
			throw new Error("Kick action requires 'member' option.");
		}

		let method: "kick" | "ban" = "kick",
			_s: Array<string> | string | undefined;
		if (this.options.has("ban")) {
			method = "ban";
		}

		if (!message.member?.permissions.has(method == "kick" ? "KickMembers" : "BanMembers")) {
			if ((_s = this.options.get("missing-permissions"))) {
				emitter.emit("macro", _s, message);
				return;
			}
		}

		let member: GuildMember | undefined, _m: string | undefined, _c: number;
		if ((_m = this.options.get("member")) && _m == "user" && message.member) {
			member = message.member;
		} else if ((<string>_m).startsWith("mention-")) {
			_s = (<string>_m).split("-");
			if (_s.length < 2 || Number.isNaN((_c = Number.parseInt(_s[1])))) {
				throw new Error("Kick action has invalid 'member' option.");
			}

			member = message.mentions.members?.at(_c - 1);
			if (!member) {
				if ((_s = this.options.get("member-not-found"))) {
					emitter.emit("macro", _s, message);
				}

				return;
			}
		} else {
			await message.guild?.members
				.fetch(<string>_m)
				.then((m) => {
					member = m;
				})
				.catch(() => {
					throw new Error("Kick action has invalid 'member' option.");
				});
		}

		try {
			await (<GuildMember>member)[method]();

			if ((_s = this.options.get("success"))) {
				emitter.emit("macro", _s, message);
			}
		} catch (err) {
			if ((_s = this.options.get("missing-permissions")) && (<{ code: number }>err)?.code === 50013) {
				emitter.emit("macro", _s, message);
			}
		}
	}
}
