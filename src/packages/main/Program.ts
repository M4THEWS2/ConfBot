import { INIFile, parse as parseINI, Section } from "./INIParser";
import { join as joinPath } from "path";
import { Client } from "discord.js";
import { Executable, loadExecutables } from "./Executable";

const configFilePath = joinPath(__dirname, "../../../natriy.cfg");

export class Program {
	static bot: Client;
	static config: INIFile;
	static commands: Executable[];

	static settings: Section | undefined;
	static prefix = "!";

	static main(): void {
		this.updateData();

		const token = this.config.getItem("token", this.settings);
		if (!token) throw new Error("no token found in section 'settings'.");

		this.bot = new Client({
			intents: [
				"Guilds",
				"GuildMessages",
				"GuildMembers",
				"GuildBans",
				"MessageContent",
			],
		});

		this.bot.on("ready", () => {
			console.log(`Bot is ready! - ${new Date().toLocaleTimeString()}`);
		});

		this.bot.on("messageCreate", (message) => {
			message.content = message.content.trimStart().trimEnd();

			if (!message.content.startsWith(this.prefix) || message.author.bot)
				return;

			const command = message.content.split(" ")[0].slice(this.prefix.length);

			for (const executable of this.commands) {
				if (executable.name == command) {
					executable.execute(this.bot, message);
					return;
				}
			}
		});

		this.bot.login(token);
	}

	static updateData(): void {
		this.config = parseINI(configFilePath);

		this.settings = this.config.getSection("settings");
		if (!this.settings) {
			throw new Error("config file needs section 'settings'.");
		}

		this.commands = [];
		if (this.config.hasSection("commands"))
			this.commands = loadExecutables(
				<Section>this.config.getSection("commands")
			);

		const tmpPrefix = this.config.getItem("prefix", this.settings);
		
		if (tmpPrefix) this.prefix = tmpPrefix;
		else
			console.warn(
				"Warn: using '!' as prefix because no prefix was found in section 'settings'."
			);
	}
}

process.on("message", (m: "start" | "update") => {
	if (m === "start") Program.main();
	else if (m === "update") Program.updateData();
});
