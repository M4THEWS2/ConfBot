<<<<<<< HEAD
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
=======
import { parseFile } from './INIParser'
import { stdout as output, stdin as input, argv as args } from 'node:process'
import { createInterface } from 'node:readline'
import { ApplicationCommand } from 'discord.js'
import { start as startBot } from './Bot'

const discordAPIBaseURL = 'https://discord.com/api'
const configFile = parseFile('natriy.cfg')

const authorization = <string | undefined>configFile.global.settings?.token
if (!authorization) throw new Error('Cannot find \'token\' in section settings')

async function updateSlashCommands () {
  const appID = configFile.global.settings?.appID
  if (!appID) throw new Error('Cannot find \'appID\' in section settings')

  const defaultHeaders = {
    Authorization: `Bot ${authorization}`,
    'Content-Type': 'application/json'
  }

  console.log('Retrieving commands...')
  const res = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, { headers: defaultHeaders })

  if (!res.ok) throw new Error(`Failed retrieving commands with code: ${res.status}. Maybe your token is incorrect`)

  const resData: ApplicationCommand[] = await res.json()
  console.log(`Got ${resData.length} command(s)`)

  for (const command of resData) {
    const { status, statusText } = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands/${command.id}`, {
      method: 'DELETE',
      headers: defaultHeaders
    })

    if (status !== 204) console.warn(`Failed deleting command ${command.name} (${command.id}) with code: ${status} ${statusText}`)
    else console.log(`Deleted command successfully: ${command.name}`)
  }

  if (!configFile.global.commands) return

  for (const commandName in configFile.global.commands.__children) {
    const command = configFile.global.commands.__children[commandName]

    const { status, statusText } = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        name: commandName,
        description: <string | undefined>command.description ?? 'No description provided'
      })
    })

    if (status === 201) console.log(`Created command successfully: ${commandName}`)
    else if (status === 200) console.warn(`Command already exists: ${commandName}`)
    else console.error(`Got error trying to create command '${commandName}' with code: ${status} ${statusText}`)
  }
}

if (args.length <= 2) {
  const completions = 'start update'.split(' ')
  function completer (line: string) {
    const hits = completions.filter((c) => c.startsWith(line))

    return [hits.length ? hits : completions, line]
  }

  const rl = createInterface({ input, output, completer })

  rl.write("'1' --> Start Bot\n")
  rl.write("'2' --> Update commands\n")

  rl.on('line', (line) => {
    line = line.trim()

    if (line.startsWith('1') || line.startsWith('start')) startBot(configFile, <string>authorization)
    else if (line.startsWith('2') || line.startsWith('update')) updateSlashCommands()
    else {
      rl.prompt()
      return
    }

    rl.close()
  })

  rl.prompt()
} else {
  if (args[2] === 'update') {
    updateSlashCommands()
  } else startBot(configFile, authorization)
}
>>>>>>> remake
