# This documentation covers all actions and settings of Natriy

## Settings

Natriy use the settings to change its way of working. Futhermore, it uses some settings values (i.e. `token` and `appID`) to be able of starting and registering commands.

**Some settings are:**

```ini
[settings]
# This is used for starting the correct Bot
token=
# This is used for registering commands
appID=
```

## Commands vs. Action vs. Macros

A command explains itself by its name, an example command is '`/bread`'. Commands are the essence of every Discord Bot. Actions are what the commands will do when executed (i.e. send a message in a Discord channel). Macros are commands that cannot be executed directly, they can only be executed by some action, for example, when you press a button a macro is executed. Each macro can contain multiple actions like commands.

### Creating a command

Every command is inside the `commands` section:

```ini
# Replace '<command-name>' for your command name
[commands.<command-name>]
```

**For this tutorial, we will be using a command named *'bread'***.

One thing you might want to do is define a description for your command:

```ini
# 'bread' and the value of 'description' could be anything
[commands.bread]
description=Say something about breads
```

### Defining an action

Actions use ID's to differentiate them from each other:

```ini
# '#' is an ID, that is, it could be anything
[commands.bread.action.#]
```

Always prefer using numbers as ID's:

```ini
# Now, '#' is a number
[commands.bread.action.1]
```

Let's define a type for our action:

```ini
[commands.bread.action.1]
# There are multiple 'types', which will be explained later
type=say
```

**The *'say'* action sends a custom message to the channel the command was sent to. Every action type will be explained later, including *'say'*.**

The *'say'* action takes an option called 'content', which is the content of the message that is going to be sent:

```ini
[commands.bread.action.1]
type=say
# ':bread:' is going to be replaced by '🍞' in Discord
content=I love :bread:!
```

As mentioned before, we can have multiple actions in one single command:

```ini
[commands.bread.action.1]
type=say
content=I love :bread:!

[commands.bread.action.2]
type=say
content=This is a second message.
```

### Creating a macro

A macro is created the same way as a command:

```ini
# Replace '<macro-name>' for your macro name
[macros.<macro-name>]
```

Let's add an action the a macro called *'macro'*:

```ini
[macros.macro.action.1]
type=say
content=This is a macro!
```

## Actions

### Say

Say is the most important function present in the Bot, as it is the responsible of sending all kinds of messages in order to communicate with the user.

#### Say Body

```ini
[commands.<command-name>.action.#]
type=say
content=Text
reply=Boolean # Leave empty for true, remove option for false

[commands.<command-name>.action.#.embed]
author-name=Text
author-icon=URL
author-url=URL

title=Text
description=Text
image=URL
thumbnail=URL
video=URL
url=URL
timestamp=Boolean

# Each message can have a max of 5 components
[commands.<command-name>.action.#.component.#]
type=Component-Type # Available types: Button

## Options For Button Type
label=Text
macro=Macro-Name # This will be executed when button is clicked
style=Number # See all available styles here:
             # https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
disabled=Boolean
url=URL
```

### Delay

Delay adds seconds for the next action to be executed.

#### Delay Body

```ini
[commands.<command-name>.action.#]
type=delay
time=Number # Seconds | Default: 5
```

### Macro

Macro executes a macro.

#### Macro Body

```ini
[commands.<command-name>.action.#]
type=macro
macro=Macro-Name
```
