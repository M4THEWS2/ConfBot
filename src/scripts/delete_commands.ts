import { parse as parseConfig } from "yaml";
import { readFile } from "node:fs/promises";
import { Settings } from "types/settings.js";
import { APIApplicationCommand, REST, Routes } from "discord.js";
import { infoPrefix } from "../utils.js";
import { ApplicationIdNotFound, TokenNotFound } from "../errors.js";

async function main() {
    const config = parseConfig(await readFile("settings.yaml", { encoding: "utf8" })) as Settings;

    if (config.token == null) throw new TokenNotFound();

    if (config.application == null) throw new ApplicationIdNotFound();

    const rest = new REST().setToken(config.token);

    const commands = (await rest.get(Routes.applicationCommands(config.application))) as Array<APIApplicationCommand>;

    console.log(infoPrefix + `Received ${commands.length} command(s)`);

    for (const command of commands) {
        rest.delete(Routes.applicationCommand(config.application, command.id)).then(() => {
            console.log(infoPrefix + `Deleted command '${command.name}'`);
        });
    }
}

if (require.main === module) {
    main();
}
