import { Client, EmbedBuilder, Message, ButtonBuilder } from "discord.js";
import { Options } from "../Config";
import { BaseAction } from "./BaseAction";

export class SayAction extends BaseAction {
	constructor(options: Options) {
		super(options);
	}

	public async do(client: Client<boolean>, message: Message<boolean>): Promise<void> {
		let embedOptions: Map<number, Options> = new Map();
		for (let [key, value] of this.options) {
			if (!key.startsWith("embed")) {
				continue;
			}

			let items = key.split("-");
			if (items.length < 3) {
				continue;
			}

			let index = Number.parseInt(items[items.length - 1]);

			if (Number.isNaN(index)) {
				continue;
			}

			items.slice(0, -1);
			if (!embedOptions.has(index)) {
				embedOptions.set(index, new Options());
			}

			embedOptions.get(index)?.set(items[1], value);
		}

		let embeds: Array<EmbedBuilder> = [];
		let _c: number | string | undefined;
		for (let [_, embed] of embedOptions) {
			embeds.push(
				new EmbedBuilder({
					title: embed.get("title"),
					description: embed.get("description"),
					author: embed.has("authorname")
						? {
								name: <string>embed.get("authorname"),
								url: embed.get("authorurl"),
								iconURL: embed.get("authoricon"),
						  }
						: undefined,
					image: embed.has("image")
						? {
								url: <string>embed.get("image"),
						  }
						: undefined,
					thumbnail: embed.has("thumbnail")
						? {
								url: <string>embed.get("thumbnail"),
						  }
						: undefined,
					color: embed.has("color") ? (Number.isNaN((_c = Number.parseInt(<string>embed.get("color")))) ? undefined : _c) : undefined,
				})
			);
		}

		let buttonOptions: Map<number, Options> = new Map();
		for (let [key, value] of this.options) {
			if (!key.startsWith("button")) {
				continue;
			}

			let items = key.split("-");
			if (items.length < 3) {
				continue;
			}

			let index = Number.parseInt(items[items.length - 1]);

			if (Number.isNaN(index)) {
				continue;
			}

			items.slice(0, -1);
			if (!buttonOptions.has(index)) {
				buttonOptions.set(index, new Options());
			}

			buttonOptions.get(index)?.set(items[1], value);
		}

		let buttons: Array<ButtonBuilder> = [];
		for (let [_, button] of buttonOptions) {
			buttons.push(
				new ButtonBuilder({
					label: button.get("label"),
					style: button.has("style") ? (Number.isNaN((_c = Number.parseInt(<string>button.get("style")))) ? 1 : _c) : 1,
					custom_id: (_c = button.get("event"))
						? _c + "/" + message.id
						: message.channel.id + "/" + message.id + " " + Math.random() * 999999,
					url: button.get("url"),
					emoji: {
						name: button.get("emojiname"),
						id: button.get("emojiid"),
					},
					disabled: button.has("disable"),
					type: 2,
				})
			);
		}

		await message.channel.send({
			content: this.options.get("content"),
			reply: this.options.has("reply")
				? {
						messageReference: message,
						failIfNotExists: false,
				  }
				: undefined,
			embeds: embeds.length ? embeds : undefined,
			components: buttons.length ? [{ type: 1, components: buttons }] : undefined,
		});
	}
}
