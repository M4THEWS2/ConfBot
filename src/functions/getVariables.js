module.exports = function (content, msg) {
    let variables = [
        {
            "name": "user_name",
            "value": msg.author.username
        },
        {
            "name": "user_id",
            "value": msg.author.id
        },
        {
            "name": "user_mention",
            "value": `<@${msg.author.id}>`
        }
    ];

    for (let i = 0; i < Object.keys(variables).length; i++) {
        if (!content) {return ""};
        content = content.replace(`{${variables[i].name}}`, variables[i].value);
    }

    return content;
}