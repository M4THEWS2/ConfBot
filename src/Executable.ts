import BaseAction from './BaseAction'
import { ChatInputCommandInteraction, Client } from 'discord.js'
import { INIFile } from './INIParser'
import SayAction from './actions/SayAction'

export class Executable {
  private readonly actions: BaseAction[]

  constructor (actions: BaseAction[]) {
    this.actions = actions
  }

  async execute (inter: ChatInputCommandInteraction, client: Client) {
    for (const action of this.actions) {
      await action.do(inter, client)
    }
  }
}

const actionsTable: { [key: string]: typeof BaseAction } = {
  none: BaseAction,
  say: SayAction
}

export function getExecutables (config: INIFile, rootSection: string): Map<string, Executable> {
  const executables: Map<string, Executable> = new Map()

  if (!config.global[rootSection]) return executables

  for (const executableName in config.global[rootSection].children) {
    const executable = config.global[rootSection].children[executableName]

    if (!executable.children.action) continue

    const actions: BaseAction[] = []
    for (const actionKey in executable.children.action.children) {
      const action = executable.children.action.children[actionKey]

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
