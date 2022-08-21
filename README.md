# **ConfBot**: easy peasy bot creation

This is the most new released version (in development branch) of ConfBot! This new version is coming out with many improvements and better performance. Which will make *your* experience with ConfBot the best possible!

## What I have done so far

I've been working on the functions that were present on the 'old' ConfBot. **But it won't take so long!** I'm sure in few days I'm gonna be ready to start creating other functions.

## Can I test this version now?

For sure! You can download ConfBot as you normally did with the 'old' version and use it however you like.

## New features already in

### Logs

Now, you can see every command people ran in your server. If you want to see the logs, go to the file `logs.log` and spy everyone.

### Personalize every message

You can personalize every message that your bot will send. Got to the file `config/lang.json` and change the texts however you like.

### Back with variables

A while ago I decided to remove the *variables*, but now, they are back!

#### How does it work?

Simple. For example: if you set a function to send *{user}* it will be replaced by the mention of who sent the command

#### These are the variables

- {user}: Mention of who sent the command

- {fmention}: First mention in the message sent by the {user}

- {user_icon}: URL of the user icon

- {user_name}: Only the username of the user

### Better ban and kick functions

Now, the ban/kick structure is like this:

```json
"name": "ban",
"member": "{user}",
"reason": "Refused to be owned by ***King Bob***.",
"yourself": true,
"bot": true
```

Where:

- "ban": name of the function.

- "{user}": user who sent the message.

- "Refused to be owned by ***King Bob***.": Custom reason to ban/kick someone. If not especified, take it from the message.

- "yourself": Set if the function will be able to ban who sent the message.

- "bot": Set who will be responsible for banning/kicking someone. If bot is selected, the user doesn't need to have *admin* permissions

#### Callback

Now, the ban/kick functions also have a callback (function that will be executed after banning/kicking someone)

You can set it like this:

```json
"callback": {
  "name": "say",
  "message": "User banned!"
}
```

### Better button function

#### Expiration time

You can set a expiration time to the button:

```json
"expiration": 60000
```

The expiration is in miliseconds: second divided by 1000

#### Time's up callback

You also can set a `timeEndCallback`, which is a simple function like this:

```json
"timeEndCallback": {
  "name": "reply",
  "message": "Banned!! Ohwn my goood"
}
```

### Sleep function

Simple usage:

```json
[
  {
    "name": "say",
    "message": "Hello!"
  },
  {
    "name": "sleep",
    "time": 5000,
    "callback": {
      "name": "reply",
      "message": "Have I already said 'Hello' to you?"
    }
  }
]
```

### Allowed channels

You can set a whitelist or blacklist to the Bot. Just follow this type of configuration:

```json
{
  "allowedChannels": {
    "type": "blacklist",
    "channels": [
      "869308360804155435",
      "869321123660181504"
    ]
  }
}
```

The `channels` array is a list of strings where each string is a channel ID.

### Activities

Now, you can set custom activities to your bot! To do it go to the file `config/status.json` and configure it like this:

```json
[
  {
    "type": 3,
    "text": "You using ConfBot."
  },
  {
    "type": 0,
    "text": "Soccer like a pro!"
  }
]
```

You can see all the types [here](https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType).

### Role function

You can/remove role from users using the `role` function. Configure it like this:

```json
{
  "name": "testRole",
  "functions": [
    {
      "name": "role",
      "role": "1002320653661249556",
      "member": "{fmention}",
      "method": "add",
      "callback": {
        "name": "reply",
        "message": "Role added!"
      }
    }
  ]
}
```

**Where:**

- *"role"*: Your role ID.
- *"member"*: Member which will get the role.
- *"method"*: It can be `add/remove`.
- *"callback"*: Function that will be runned if the function ends with success.
