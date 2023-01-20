import { Client, Interaction } from 'discord.js'
import { Section } from './INIParser'

export class BaseAction {
  private readonly __options: Section
  protected options: Section

  constructor (options: Section) {
    this.__options = options
    this.options = Object.assign({}, this.__options)
  }

  protected loadVars (currSec: Section, inter: Interaction) {
    for (const key in currSec) {
      if (key === '__children') {
        for (const child in currSec.__children) {
          this.loadVars(currSec.__children[child], inter)
        }

        continue
      }

      currSec[key] = (<string>currSec[key]).replace(/{user-name}/g, inter.user.username)
      currSec[key] = (<string>currSec[key]).replace(/{user-id}/g, inter.user.id)
      currSec[key] = (<string>currSec[key]).replace(/{user-mention}/g, `<@${inter.user.id}>`)

      currSec[key] = (<string>currSec[key]).replace(/{channel-id}/g, inter.channelId ?? '')
    }
  }

  protected async baseDo (inter: Interaction, client: Client) {}

  async do (inter: Interaction, client: Client) {
    this.loadVars(this.options, inter)

    await this.baseDo(inter, client)

    this.options = Object.assign({}, this.__options)
  }
}

export default BaseAction
