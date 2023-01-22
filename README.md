<div align="center">
    <br />
    <p>
        <img src="https://img.shields.io/node/v/discord.js" />
        <img src="https://img.shields.io/github/package-json/dependency-version/matheuscristian/Natriy/discord.js" />
        <img src="https://img.shields.io/github/package-json/dependency-version/matheuscristian/Natriy/dev/typescript" />
    </p>
    <p>
        <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" />
    </p>
</div>
<hr />

## This code uses

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## About

Natriy is a program that helps you create bots for Discord. All you need to do is edit your bot's program settings and commands to your liking and your bot is ready to go.

- Easy to configure
- Configuration file follows [INI format](https://en.wikipedia.org/wiki/INI_file)
- Create various type of commands
- Performant

## Installation

**Node.js 16.9.0 or newer is required.**

```sh-session
git clone https://github.com/matheuscristian/Natriy.git && \
cd Natriy && \
npm install
```

## Example usage

Create command *bread*:

```ini
[settings]
token=Your token
appID=Your application ID

# Bread command
[commands.bread]
description=Say something about breads

[commands.bread.action.1]
type=say
reply=
content=I love :bread:!
```

Send commands to Discord as slash commands:

```sh-session
npm run update
```

Now, start Natriy:

```sh-session
npm start
```

**Read more at [Documentation](https://github.com/matheuscristian/Natriy/blob/main/Docs.md).**
