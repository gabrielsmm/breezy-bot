const { Events } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(message, client) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName);

        if (!command) {
            console.error(`Nenhum comando com esse nome foi encontrado.`);
            return;
        }

        try {
            await command.execute(message, client, args);
        } catch (error) {
        	console.error(`Erro ao executar o comando`);
			console.error(error);
        }
	},
};