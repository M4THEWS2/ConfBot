import { Client, EmbedBuilder, Message, ButtonBuilder } from "discord.js";
import { Items } from "../Config";
import { BaseAction } from "./BaseAction";

export class SayAction extends BaseAction {
	constructor(options: Items) {
		super(options);
	}

	public async do(client: Client, message: Message): Promise<void> {
		let componentOptions: Map<string, Items> = new Map();
		for (const [key, value] of this.options) {
			if (!key.startsWith("embed")) {
				continue;
			}

			const items = key.split("-");
			if (items.length < 3) {
				throw new Error("Error: some embed option is incomplete.");
			}

			const index = items[items.length - 1];
			if (!this.options.isAlphaNumeric(index)) {
				throw new Error("Error: some embed property is missing index.");
			}

			items.pop();
			if (!componentOptions.has(index)) {
				componentOptions.set(index, new Items());
			}

			componentOptions.get(index)?.set(items[1], value);
		}

		const embeds: Array<EmbedBuilder> = [];
		let _c: number | string | undefined;
		for (const [_, embed] of componentOptions) {
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

		componentOptions = new Map();
		for (const [key, value] of this.options) {
			if (!key.startsWith("button")) {
				continue;
			}

			const items = key.split("-");
			if (items.length < 3) {
				throw new Error("Error: some button option is incomplete.");
			}

			const index = items[items.length - 1];
			if (!this.options.isAlphaNumeric(index)) {
				throw new Error("Error: some button property is missing index.");
			}

			items.pop();
			if (!componentOptions.has(index)) {
				componentOptions.set(index, new Items());
			}

			componentOptions.get(index)?.set(items[1], value);
		}

		const buttons: Array<ButtonBuilder> = [];
		for (const [_, button] of componentOptions) {
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
