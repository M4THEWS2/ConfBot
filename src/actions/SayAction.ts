import { ChatInputCommandInteraction, Client } from 'discord.js'
import BaseAction from '../BaseAction'

export class SayAction extends BaseAction {
  async do (inter: ChatInputCommandInteraction, client: Client) {
    await inter.reply({
      content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined
    })
  }
}

export default SayAction
