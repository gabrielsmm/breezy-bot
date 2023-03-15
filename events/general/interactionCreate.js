const { Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Nenhum comando com o seguinte nome ${interaction.commandName} foi encontrado.`);
			return;
		}

		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(`Erro ao executar o comando ${interaction.commandName}`);
			console.error(error);
		}
	},
};