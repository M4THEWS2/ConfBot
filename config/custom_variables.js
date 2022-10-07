'use strict'
const date = new Date();

module.exports = (client, message, lang) => {
    const variables = [
        {
            name: "hour_on_server",
            value: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        },
        {
            name: "user",
            value: `<@${message.author.id}>`
        },
        {
            name: "first_mention",
            value: message.mentions.members.first() ? `<@${message.mentions.members.first().id}>` : lang.noMentionMessage
        },
        {
            name: "user_avatar",
            value: message.author.displayAvatarURL()
        },
        {
            name: "user_name",
            value: message.author.username
        }
    ]

    return variables.map((currentValue) => {
        return { name: new RegExp(`{${currentValue.name}}`, 'g'), value: currentValue.value };
    });
}