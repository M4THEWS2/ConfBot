import { join as joinPath } from "node:path";
import { existsSync as fileExists, watch as watchFile } from "node:fs";
import { fork, ChildProcess } from "child_process";
import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises";
import { parse as parseINI } from "./packages/main/INIParser";
import { request, get } from "node:http";
import { ApplicationCommand } from "discord.js";

const configFilePath = joinPath(__dirname, "../natriy.cfg");

function programStart(): void {
	const mainPackage = "main";
	const mainClass = "Program";

	const mainFilePath = joinPath(__dirname, `./packages/${mainPackage}/${mainClass}.js`);

	if (!fileExists(mainFilePath)) {
		throw new Error(`class ${mainPackage}/${mainClass} (${mainFilePath}) doesn't exists.`);
	}

	if (!fileExists(configFilePath)) {
		throw new Error(`config file (${configFilePath}) wasn't found.`);
	}

	function spawnProgramProcess(): ChildProcess {
		const newProcess = fork(mainFilePath);

		newProcess.once("spawn", () => {
			newProcess.send("start", (err) => {
				if (err) console.error(err);
			});
		});

		newProcess.once("error", (err) => {
			console.error(err);
		});

		return newProcess;
	}

	let programProcess = spawnProgramProcess();

	let canUpdate = true;
	watchFile(configFilePath, (e) => {
		if (e == "rename") {
			throw new Error(`config file (${configFilePath}) was renamed.`);
		}

		if (!programProcess.connected) {
			programProcess = spawnProgramProcess();
			canUpdate = false;
			return;
		}

		if (canUpdate) {
			programProcess.send("update", (err) => {
				if (err) console.error(err);
			});

			canUpdate = false;
			return;
		}

		if (!canUpdate) canUpdate = true;
	});
}

const readLine = createInterface({ input: stdin, output: stdout });

(async () => {
	readLine.write("--> '1' to start bot\n--> '2' to register commands\n\n");
	const ans = await readLine.question("What do you want to do?: ");

	if (ans == '1') {
		console.log("Starting...");
		programStart();
	} else {
		const config = parseINI(configFilePath);

		const settings = config.getSection("settings");
		if (!settings) throw new Error("missing 'settings' section.");

		const applicationID = config.getItem("applicationID", settings);
		if (!applicationID) throw new Error("missing 'applicationID' in settings.");

		get(`https://discord.com/api/v10/applications/${applicationID}/commands`, (res) => {
			if (res.statusCode !== 200) throw new Error(`failed to get commands with status code: ${res.statusCode}`);

			res.setEncoding("utf-8");

			let rawdata = '';
			res.on("data", (chunk) => {
				rawdata += chunk;
			});

			res.on("end", () => {
				let commands: Array<ApplicationCommand>;

				try {
					commands = JSON.parse(rawdata);
				} catch (e) {
					console.error(e);
					return;
				}

				commands.forEach((command) => {
					request(`https://discord.com/api/v10/applications/${applicationID}/commands/${command.id}`, {
						method: "DELETE"
					}, (res) => {
						if (res.statusCode !== 204) throw new Error(`failed to delete previous commands with status code: ${res.statusCode}`);
					});
				});
			});
		});

		
	}

	readLine.close();
})();
