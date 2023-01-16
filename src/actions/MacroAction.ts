import { Interaction, CacheType, Client } from 'discord.js'
import { BaseAction } from '../BaseAction'

export class MacroAction extends BaseAction {
  async do (inter: Interaction<CacheType>, client: Client<boolean>): Promise<void> {
    if (!this.options.macro) {
      throw new Error("Macro action needs 'macro' option")
    }
    client.emit('macro', this.options.macro, inter)
  }
}

export default MacroAction
