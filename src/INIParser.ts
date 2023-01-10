import { readFileSync as readFile } from 'node:fs'

export interface Section {
  [key: string]: string | { [name: string]: Section }
  children: { [name: string]: Section }
}

type Sections = { [name: string]: Section }

export class INIFile {
  private readonly data: Sections

  constructor (data: Sections) {
    this.data = data
  }

  public get global (): Sections {
    return this.data
  }
}

export function parseFile (path: string): INIFile {
  const file = readFile(path, { encoding: 'utf-8' })

  const data: Section = { children: {} }

  let lastSection: Section = data
  for (let line of file.split('\n')) {
    line = line.trimStart().trimEnd()

    if (line[0] === '#' || line[0] === ';' || line === '') continue

    if (line.startsWith('[') && line.endsWith(']')) {
      lastSection = data

      for (const sectionName of line.slice(1, -1).split('.')) {
        if (!lastSection.children[sectionName]) lastSection.children[sectionName] = { children: {} }

        lastSection = lastSection.children[sectionName]
      }
    } else {
      let [key, value] = line.split('=')

      key = key.trimEnd()

      if (value) value = value.trimStart()
      else value = ''

      lastSection[key] = value
    }
  }

  return new INIFile(data.children)
}

export default parseFile
