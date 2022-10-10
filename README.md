# Welcome to the newest version of Natriy

This is the official documentation, it will help you to use Natriy by explaining all the functions and possibilities it has.

## Getting started

### Adding your token

Your bot needs a token to initialize. The token is the identifier of the bot. With the token, Discord knows which bot it will communicate with.

#### How do I get a token?

Go to [Discord Developer's portal](https://discord.com/developers/applications), log in with your Discord account, then hit *New Application*. Go to the bot tab and create a new bot. Now copy its token.

Paste your token in *config/config.json*:

```json
{
    "token": "TOKEN HERE! BETWEEN QUOTATION MARKS!"
}
```

You may want to add your bot to your server. Go back to the general information tab and copy the application id. Then go to [Discord Permissions Calculator](https://discordapi.com/permissions.html), paste the id, check the *Administrator* permission and click on the link.

### Downloading dependencies

To start Natriy you need to have *NodeJS* and *Git* all installed on your computer.

#### Installing NodeJS

Click [here](https://nodejs.org/en/download/current/) and install the *current* version according to your operating system.

#### Installing Git

Click [here](https://git-scm.com/) and download the latest version of Git, once again, according to your operating system.

### Downloading node dependencies

Once before you start your bot, you need to run `scripts/update`, it will download all NPM packages that Natriy needs.

### Difference between functions and commands

Every bot has the help command, when running it, the bot usually sends an explanation of what it does and what its commands are.

However, how can we create a help command with Natriy? It's not that difficult, you have to configure a command that has a function that will send an explain message. Easy, isn't it?

This is an configuration example of a help command with Natriy:

```json
{
    "name": "help",
    "functions": [
        {
            "name": "say",
            "message": "This is may help message!"
        }
    ]
}
```

Now that you know about functions and commands, see all the available functions and how to use them.

## Functions

### Say

The function that you will use the most is the **say** function. This will be the responsible for sending all types of messages and their attachments (files, buttons and embeds).

The most basic usage of it is like this:

```json
{
    "name": "say",
    "message": "My beautiful message!"
}
```

In this case, the function will send a simple message on the channel where the command came from.

You can also define whether the function will send the message as a reply to the one who sent the command or not:

```json
{
    "name": "say",
    "message": "My beautiful message!",
    "reply": true
}
```

To send a message with buttons:

```json
{
    "name": "say",
    "message": "Is my message beautiful?",
    "reply": true,
    "buttons": [
        {
            "label": "yes",
            "style": 3
        },
        {
            "label": "no",
            "style": 4
        }
    ]
}
```

*Advices:*

- You can use a maximum of 5 buttons per message.
- See all available styles [here](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle).

You can also define functions to be executed when a button is pressed by adding a callback:

```json
{
    "buttons": [
        {
            "label": "yes",
            "style": 3,
            "callback": {
                "name": "say",
                "message": "Thanks!"
            }
        },
        {
            "label": "no",
            "style": 4,
            "callback": {
                "name": "say",
                "message": "How dare you?!"
            }
        }
    ]
}
```

By default, buttons take 1 minute to expire. But you can change it adding the expiration option:

```json
{
    "name": "say",
    "message": "Is my message beautiful?",
    "reply": true,
    "buttons": [...],
    "expiration": 10000
}
```

*Advices:*

- Expiration option is in milliseconds (second * 1000), which means you can get the seconds by dividing the millisecond by 1000.

If you want to execute some function if the button wasn't pressed in time, just add the timeIsUpCallback:

```json
{
    "name": "say",
    "message": "Is my message beautiful?",
    "reply": true,
    "buttons": [...],
    "expiration": 10000,
    "timeIsUpCallback": {
        "name": "say",
        "message": "Time's Up!"
    }
}
```

Let's talk about embeds! To append an embed to your message add the embed property:

```json
{
    "name": "say",
    "embed": {
        "title": "**MY MESSAGE!!**",
        "description": "My message is the message, which is the most beautiful."
    }
}
```

*Advices:*

- You can see all the options for embed messages [here](https://discord.js.org/#/docs/discord.js/main/class/Embed).

To send the message with files:

```json
{
    "name": "say",
    "message": "Listen to this song!",
    "files": [
        {
            "attachment": "song.mp3",
            "name": "It Was A Good Day.mp3",
            "description": "Best song!"
        }
    ]
}
```

### Ban & Kick

The **ban** & **kick** function have the same way of working so I will explain them together.

When using these functions you need to specify which user is going to be banned:

```json
{
    "name": "ban",
    "member": "{first_mention}"
}
```

*Advices:*

- `{first_mention}` corresponds to the first mention in the message. If there isn't, send an error message (We will see how you can personalize it later).

You can use the *bot* option to set whether the user will need permissions of banning to do it or not:

```json
{
    "name": "ban",
    "member": "{first_mention}",
    "bot": true
}
```

You also can set whether the user will be able to ban himself or not:

```json
{
    "name": "ban",
    "member": "{first_mention}",
    "bot": true,
    "yourself": true
}
```

If all occurred fine, you may want to send a message or do something else:

```json
{
    "name": "ban",
    "member": "{first_mention}",
    "callback": {
        "name": "say",
        "message": "User banned!"
    }
}
```

### Array

You may want to execute more than one function in a callback, that's why the **array** function exists. Use it like this:

```json
{
    "name": "array",
    "functions": [...]
}
```

Put the functions you want inside *functions*.

### Sleep

If you're not in a hurry, you can set a delay for the bot to executing your command:

```json
{
    "name": "sleep",
    "callback": {
        "name": "say",
        "message": "How much time did I sleep for?"
    },
    "time": 5000
}
```

*Advices:*

- *time* is always in milliseconds.

### Loop

To repeat a function for X times, use this function:

```json
{
    "name": "loop",
    "callback": {
        "name": "say",
        "message": "Hi, my name is Dory!"
    },
    "times": "10"
}
```

### Send From File

You can also send content from files in your Discord chats:

```json
{
    "name": "send_from_file",
    "path": "messages/help.txt"
}
```

The example above sends the help message that is within the `help.txt`.

### Role

The *role* function can add/remove roles from members of a guild. You can use it like this:

```json
{
    "name": "role",
    "method": "add",
    "role": "some random id",
    "bot": false,
    "member": "{first_mention}"
}
```

*Explanation:*

- The *method* property can be add or remove.
- The *role* property is a role identificador, which can be a role ID for example.
- The *bot* property defines whether the member who sent the command needs to have permissions of managing roles to run it.
- The *member* property defines who will be the target where the function will add a role.

## Activities

You can set activities for your bot that will be switched between each other randomly.

Go to the file: `config/activities.json`, these are the default activities:

```json
[
  {
    "type": 3,
    "text": "You using Natriy."
  },
  {
    "type": 0,
    "text": "Soccer like a pro!"
  }
]
```

Every activity has two properties: *type* and *text*. You can see all available types [here](https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType) (Natriy doesn't support type 4).

## Custom error messages

A while ago it wasn't possible to change error messages in Natriy, but now you can do it! Go to the file: `config/lang.json`, now it's just personalize everything however you like.

This is the default configuration of *`config/lang.json`*:

```json
{
  "ready": "Your Bot is now online!",
  "functionError": "There was an error trying to execute {command}! :exploding_head:",
  "commandDoesNotExist": "Command does not exist. :warning:",
  "cantBan&KickYourself": "You can't neither ban nor kick yourself! :clown:",
  "cantBan&KickAdmin": "You can't neither ban nor kick an admin. :wink:",
  "botMissingPermissions": "I don't have the required permissions to do this... :pensive:",
  "MissingPermissions": "You are missing permissions to do this! :joy:",
  "noMentionError": "You need to mention a user!!! :rage:",
  "noMentionMessage": "{no_user}"
}
```
