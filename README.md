<div align="center">
    <br />
    <p>
        <img src="https://img.shields.io/node/v/discord.js" />
        <img src="https://img.shields.io/github/package-json/dependency-version/matheuscristian/Natriy/discord.js" />
        <img src="https://img.shields.io/github/package-json/dependency-version/matheuscristian/Natriy/dev/typescript" />
    </p>
    <p>
        <img src="https://img.shields.io/github/downloads/matheuscristian/Natriy/total" />
    </p>
</div>
<hr />

## About

Natriy is a program that helps you create Bots for Discord. All you need to do is edit your Bot's program settings and commands to your liking and your Bot is ready to go.

- Easy to configure
- Configuration file follows [INI format](https://en.wikipedia.org/wiki/INI_file)
- Create various type of commands
- Performant

## Installation

**Node.js 16.9.0 or newer is required.**

```sh-session
git clone https://github.com/matheuscristian/Natriy.git
cd Natriy
npm install
```
## Example usage

Create command *bread*: 

```ini
[options]
token=Your token.
prefix=!

[commands.bread.actions.1]
type=say
reply=
content=I love :bread:!
```

Now, start Natriy:

```sh-session
npm start
```
