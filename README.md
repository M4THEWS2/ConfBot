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

### Array

You may want to execute more than one function in a callback, that's why the **array** function exists. Use it like this:

```json
{
    "name": "array",
    "functions": [...]
}
```

Put the functions you want inside *functions*.

## More documentation is coming out soon
