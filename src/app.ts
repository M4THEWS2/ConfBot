import { parse as parseYAML } from "yaml";
import { readFile, watch as watchFile } from "node:fs/promises";
import { Client } from "discord.js";
import * as Events from "./events.js";
import { Settings } from "types/settings.js";
import { warnPrefix } from "./utils.js";
import { TokenNotFound } from "./errors.js";

const SETTINGS_PATH = "settings.yaml";

async function parseSettingsFile() {
    return parseYAML((await readFile(SETTINGS_PATH)).toString()) as Settings;
}

async function watchSettingsFile() {
    for await (const _ of watchFile(SETTINGS_PATH)) {
        const settings = await parseSettingsFile();

        console.warn(warnPrefix + "Reloading settings due to detection of changes in file");

        Events.loadSettings(settings);
    }
}

async function main() {
    const settings = await parseSettingsFile();

    if (settings.token == null) throw new TokenNotFound();

    const client = new Client({ intents: ["Guilds"] });

    await Events.loadSettings(settings);

    Events.registerEvents(client);

    watchSettingsFile();

    client.login(settings.token);
}

if (require.main === module) {
    main();
}
