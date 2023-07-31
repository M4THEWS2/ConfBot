import { parse as parseConfig } from "yaml";
import { readFile } from "node:fs/promises";
import { Settings } from "types/settings.js";
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody as JSONSlashCommandBody, Routes } from "discord.js";
import { errorPrefix, infoPrefix } from "../utils.js";
import { ApplicationIdNotFound, TokenNotFound } from "../errors.js";

async function main() {
    const config = parseConfig(await readFile("settings.yaml", { encoding: "utf8" })) as Settings;

    if (config.token == null) throw new TokenNotFound();

    if (config.application == null) throw new ApplicationIdNotFound();

    if (config.commands == null) {
        console.error(errorPrefix + "'commands' property not found in settings. No command is going to be deployed");

        return;
    }

    const JSONCommands: Array<JSONSlashCommandBody> = [];

    for (const commandName in config.commands) {
        console.log(infoPrefix + `Loading command '${commandName}'`);

        JSONCommands.push({
            name: commandName,
            description: config.commands[commandName]?.description ?? "No description",
            ...config.commands[commandName],
        });
    }

    const rest = new REST().setToken(config.token);

    const data = (await rest.put(Routes.applicationCommands(config.application), { body: JSONCommands })) as Array<object>;

    console.log(infoPrefix + `Deployed ${data.length} command(s)`);
}

if (require.main === module) {
    main();
}
