import { parseFile } from './INIParser'
import { stdout as output, stdin as input, argv as args } from 'node:process'
import { createInterface } from 'node:readline'
import { ApplicationCommand } from 'discord.js'
import { start as startBot } from './Bot'

const discordAPIBaseURL = 'https://discord.com/api'
const configFile = parseFile('natriy.cfg')

const authorization = <string | undefined>configFile.global.settings?.token
if (!authorization) throw new Error('Cannot find \'token\' in section settings')

async function updateSlashCommands () {
  const appID = configFile.global.settings?.appID
  if (!appID) throw new Error('Cannot find \'appID\' in section settings')

  const defaultHeaders = {
    Authorization: `Bot ${authorization}`,
    'Content-Type': 'application/json'
  }

  console.log('Retrieving commands...')
  const res = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, { headers: defaultHeaders })

  if (!res.ok) throw new Error(`Failed retrieving commands with code: ${res.status}. Maybe your token is incorrect`)

  const resData: ApplicationCommand[] = await res.json()
  console.log(`Got ${resData.length} command(s)`)

  for (const command of resData) {
    const { status, statusText } = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands/${command.id}`, {
      method: 'DELETE',
      headers: defaultHeaders
    })

    if (status !== 204) console.warn(`Failed deleting command ${command.name} (${command.id}) with code: ${status} ${statusText}`)
    else console.log(`Deleted command successfully: ${command.name}`)
  }

  if (!configFile.global.commands) return

  for (const commandName in configFile.global.commands.__children) {
    const command = configFile.global.commands.__children[commandName]

    const { status, statusText } = await fetch(`${discordAPIBaseURL}/applications/${appID}/commands`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        name: commandName,
        description: <string | undefined>command.description ?? 'No description provided'
      })
    })

    if (status === 201) console.log(`Created command successfully: ${commandName}`)
    else if (status === 200) console.warn(`Command already exists: ${commandName}`)
    else console.error(`Got error trying to create command '${commandName}' with code: ${status} ${statusText}`)
  }
}

if (args.length <= 2) {
  const completions = 'start update'.split(' ')
  function completer (line: string) {
    const hits = completions.filter((c) => c.startsWith(line))

    return [hits.length ? hits : completions, line]
  }

  const rl = createInterface({ input, output, completer })

  rl.write("'1' --> Start Bot\n")
  rl.write("'2' --> Update commands\n")

  rl.on('line', (line) => {
    line = line.trim()

    if (line.startsWith('1') || line.startsWith('start')) startBot(configFile, <string>authorization)
    else if (line.startsWith('2') || line.startsWith('update')) updateSlashCommands()
    else {
      rl.prompt()
      return
    }

    rl.close()
  })

  rl.prompt()
} else {
  if (args[2] === 'update') {
    updateSlashCommands()
  } else startBot(configFile, authorization)
}
