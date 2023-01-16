import { Client, Interaction } from 'discord.js'
import { Section } from './INIParser'

export class BaseAction {
  protected readonly options: Section

  constructor (options: Section) {
    this.options = options
  }

  async do (inter: Interaction, client: Client) {}
}

export default BaseAction
