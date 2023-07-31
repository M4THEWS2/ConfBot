import { BaseMessageOptions } from "discord.js";
import { Action } from "types/commands";

interface sayActionOptions extends BaseMessageOptions {}

export default {
    async run(interaction) {
        await interaction.reply(this.rawBody);
    },
} as Action & { rawBody: Partial<sayActionOptions> };
