import { Interaction } from 'discord.js'
import { BaseAction } from '../BaseAction'

export class DelayAction extends BaseAction {
  async do (inter: Interaction): Promise<void> {
    const time = Number.parseFloat(<string> this.options.time ?? '')
    if (inter.isChatInputCommand()) inter.deferReply()
    return new Promise((resolve) => {
      setTimeout(() => { resolve() }, !Number.isNaN(time) ? (time * 1000) : 5000)
    })
  }
}

export default DelayAction
