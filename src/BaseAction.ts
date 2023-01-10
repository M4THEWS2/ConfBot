import { ChatInputCommandInteraction, Client } from 'discord.js'
import { Section } from './INIParser'

export class BaseAction {
  protected readonly options: Section

  constructor (options: Section) {
    this.options = options
  }

  async do (inter: ChatInputCommandInteraction, client: Client) {
    await inter.reply({ content: 'Executed!' })
  }
}

export default BaseAction
