import BaseAction from './BaseAction'
import { Client, Interaction } from 'discord.js'
import { INIFile } from './INIParser'
import SayAction from './actions/SayAction'
import DelayAction from './actions/DelayAction'
import MacroAction from './actions/MacroAction'

export class Executable {
  private readonly actions: BaseAction[]

  constructor (actions: BaseAction[]) {
    this.actions = actions
  }

  async execute (inter: Interaction, client: Client) {
    try {
      for (const action of this.actions) {
        await action.do(inter, client)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

const actionsTable: { [key: string]: typeof BaseAction } = {
  none: BaseAction,
  say: SayAction,
  delay: DelayAction,
  macro: MacroAction
}

export function getExecutables (config: INIFile, rootSection: string): Map<string, Executable> {
  const executables: Map<string, Executable> = new Map()

  if (!config.global[rootSection]) return executables

  for (const executableName in config.global[rootSection].__children) {
    const executable = config.global[rootSection].__children[executableName]

    if (!executable.__children.action) continue

    const actions: BaseAction[] = []
    for (const actionKey in executable.__children.action.__children) {
      const action = executable.__children.action.__children[actionKey]

      if (!action.type) {
        console.warn(`Missing type in action: ${executableName}.action.${actionKey}`)
        continue
      }

      if (!actionsTable[<string>action.type]) {
        console.warn(`Invalid type in action: ${executableName}.action.${actionKey}`)
        continue
      }

      actions.push(new actionsTable[<string>action.type](action))
    }

    executables.set(executableName, new Executable(actions))
  }

  return executables
}

export default Executable
