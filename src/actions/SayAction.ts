import { APIEmbed, ChatInputCommandInteraction, Client } from 'discord.js'
import BaseAction from '../BaseAction'

export class SayAction extends BaseAction {
  async do (inter: ChatInputCommandInteraction, client: Client) {
    let embed: APIEmbed | undefined

    if (this.options.__children.embed) {
      embed = {}
      const embedOptions = this.options.__children.embed

      embed.author = <string | undefined>embedOptions['author-name']
        ? {
            name: <string>embedOptions['author-name'],
            icon_url: <string | undefined>embedOptions['author-icon'],
            url: <string | undefined>embedOptions['author-url']
          }
        : undefined
      embed.title = <string | undefined>embedOptions.title
      embed.description = <string | undefined>embedOptions.description
      embed.image = <string | undefined>embedOptions.image ? { url: <string>embedOptions.image } : undefined
      embed.thumbnail = <string | undefined>embedOptions.thumbnail ? { url: <string>embedOptions.thumbnail } : undefined
      embed.video = <string | undefined>embedOptions.video ? { url: <string>embedOptions.video } : undefined
      embed.url = <string | undefined>embedOptions.url
      embed.timestamp = embedOptions.timestamp != null ? (new Date()).toISOString() : undefined
    }

    await inter.reply({
      content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined,
      embeds: embed ? [embed] : undefined
    })
  }
}

export default SayAction
