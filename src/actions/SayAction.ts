import { APIActionRowComponent, APIButtonComponent, APIEmbed, APIMessageActionRowComponent, Interaction, InteractionReplyOptions, MessageCreateOptions } from 'discord.js'
import BaseAction from '../BaseAction'
import { Buffer } from 'node:buffer'

function generateRandomID (): string {
  const strBuffer = Buffer.allocUnsafe(20)

  for (let i = 0; i < 20; i++) {
    let charCode = 32 + Math.floor(Math.random() * 94)
    if (charCode === 47) charCode++

    strBuffer[i] = charCode
  }

  return strBuffer.toString('ascii')
}

export class SayAction extends BaseAction {
  async baseDo (inter: Interaction) {
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

    let components: APIActionRowComponent<APIMessageActionRowComponent> | undefined

    if (this.options.__children.component) {
      components = { type: 1, components: [] }

      for (const componentKey in this.options.__children.component.__children) {
        const component = this.options.__children.component.__children[componentKey]

        if (!component.type) {
          console.warn(`Missing type in component '${componentKey}'`)
        }

        if (component.type === 'button') {
          const button: APIButtonComponent = {
            label: <string | undefined>component.label,
            type: 2,
            custom_id: `${<string | undefined>component.macro ? <string>component.macro : inter.channelId}/${generateRandomID()}/${component['disable-all'] != null ? '1' : '0'}`,
            style: <string | undefined>component.style ? (Number.parseInt(<string>component.style) ?? 1) : 1,
            disabled: component.disabled != null,
            url: <string | undefined>component.style === '5' ? <string | undefined>component.url : undefined
          }

          components.components.push(button)
        }
      }
    }

    const messageOptions: MessageCreateOptions & InteractionReplyOptions = {
      content: this.options.content ? `${this.options.reply != null ? `<@${inter.user.id}>, ` : ''}${this.options.content}` : undefined,
      embeds: embed ? [embed] : undefined,
      components: components ? [components] : undefined
    }

    if (!inter.isChatInputCommand()) {
      if (inter.isRepliable()) await inter.reply(messageOptions)

      return
    }

    if (inter.deferred) await inter.editReply(messageOptions)
    else if (inter.replied) await inter.followUp(messageOptions)
    else await inter.reply(messageOptions)
  }
}

export default SayAction
