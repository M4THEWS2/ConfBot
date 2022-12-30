# Basics

## Understanding Commands, Actions and Macros

The easiest here is the command one. A command is what we type in a Discord channel. Actions are what the command does, an action is the command's actions after we execute it. A macro is the same of a command, but we can't execute it and it can be used by commands.

## Creating a simple command

Before we create our first command we need to set some essential options; they are our *token* and bot *prefix*:

```ini
[options]
prefix=!
token=<YourToken>
```

Now, we can create the command. Let's name it ***bread*** 🍞:

```ini
[commands.bread.actions.1]
type=say
content=I love :bread:!
```

These describe the action number *1* (first action) that our bot will do after we execute the command *bread*.

# Section definitions

## Options

To set the options do:

```ini
[options]
token=<YourToken>
...
```

> ***Advice:* *Token* is required or you will get an error.**

## Commands

To create a command do:

```ini
[commands.<CommandName>]
```

To add an action to a command do:

```ini
[commands.<CommandName>.actions.<Identifier>]
type=<ActionType>
...
```
> ***Advice:* Never add an action with a same *identifier* as another or your action will be overwritten, and the *identifier* must be a number.**

## Macros

To create a macro do:

```ini
[macros.<MacroName>]
```

To add an action to a macro do:

```ini
[macros.<MacroName>.actions.<Identifier>]
type=<ActionType>
...
```
> ***Advice:* Never add an action with a same *identifier* as another or your action will be overwritten, and the *identifier* must be a number.**

# Actions

## Nothing here yet. But don't worry! More updates are coming soon!
