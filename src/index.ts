import { join as joinPath } from "path";
import { existsSync as fileExists, watch as watchFile } from "fs";
import { fork, ChildProcess } from "child_process";

const mainPackage = "main";
const mainClass = "Program";

const mainFilePath = joinPath(__dirname, `./packages/${mainPackage}/${mainClass}.js`);
const configFilePath = joinPath(__dirname, "../natriy.cfg");

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
