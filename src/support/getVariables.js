const config = require('../../config.json');

module.exports = function (content, msg) {
    let command = msg.content.includes(" ") ? msg.content.split(" ")[0] : msg.content; // Cria uma variável que contém o comando enviado com o prefixo
    command = command.substring(config.prefix.length, command.length).toLowerCase(); // Retira o prefixo do comando
    
    let variables = [ // Cria uma variável com todos as variáveis disponíveis
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
        },
        {
            "name": "command",
            "value": command
        },
        {
            "name": "prefix",
            "value": config.prefix
        }
    ];

    for (let i = 0; i < Object.keys(variables).length; i++) { // Para cada variável troca ela pelo valor dela
        if (!content) {return ""};
        content = content.replace(`{${variables[i].name}}`, variables[i].value);
    }

    return content; // retorna o texto
}