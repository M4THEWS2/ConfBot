import { ApplicationCommandType, Client, InteractionType } from 'discord.js'
import Executable, { getExecutables } from './Executable'
import { INIFile } from './INIParser'

export function start (config: INIFile, token: string) {
  const bot = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'GuildBans', 'MessageContent']
  })

  const commands: Map<string, Executable> = getExecutables(config, 'commands')

  bot.on('ready', () => {
    console.log('Bot is ready!')
  })

  bot.on('interactionCreate', async (inter) => {
    if (inter.type === InteractionType.ApplicationCommand && inter.commandType === ApplicationCommandType.ChatInput) {
      if (commands.has(inter.commandName)) {
        await commands.get(inter.commandName)?.execute(inter, bot)
      }
    }
  })

  bot.login(token)
}

export default start
