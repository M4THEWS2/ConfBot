import { ApplicationCommandType, Client, Interaction, InteractionType } from 'discord.js'
import Executable, { getExecutables } from './Executable'
import { INIFile } from './INIParser'

export function start (config: INIFile, token: string) {
  const bot = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'GuildBans', 'MessageContent']
  })

  const commands: Map<string, Executable> = getExecutables(config, 'commands')
  const macros: Map<string, Executable> = getExecutables(config, 'macros')

  bot.on('ready', () => {
    console.log('Bot is ready!')
  })

  bot.on('interactionCreate', async (inter) => {
    if (inter.type === InteractionType.ApplicationCommand && inter.commandType === ApplicationCommandType.ChatInput) {
      await commands.get(inter.commandName)?.execute(inter, bot)
    } else if (inter.type === InteractionType.MessageComponent) {
      const interArgs = inter.customId.split('/')
      const macroName = interArgs[0]

      await macros.get(macroName)?.execute(inter, bot)

      if (inter.isButton() && interArgs[2] === '1') {
        const newComponents = Object.assign({}, inter.message.components)[0].toJSON()

        for (const component of newComponents.components) {
          if (component.type === 2) {
            component.disabled = true
          }
        }

        await inter.message.edit({ components: [newComponents] })
      }
    }
  })

  bot.on('macro', async (macroName: string, inter: Interaction) => {
    await macros.get(macroName)?.execute(inter, bot)
  })

  bot.login(token)
}

export default start
