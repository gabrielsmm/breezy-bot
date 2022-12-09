const { Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

        // if (interaction.commandName === 'ping') {
        //     await interaction.reply('Pong!');
        //     await wait(2000);
        //     await interaction.editReply('Pong again!'); // Editando uma resposta
        //     return;
        // }

        // if (interaction.commandName === 'ping') {
        //     await interaction.deferReply({ ephemeral: true }); // Bot está pensando...
        //     await wait(4000);
        //     await interaction.editReply('Pong!');
        // }

        // if (interaction.commandName === 'ping') {
        //     await interaction.reply('Pong!');
        //     await interaction.followUp({ content: 'Pong again!', ephemeral: true }); // Mensagens adicionais
        // }

        // await interaction.deleteReply(); //Deletar uma resposta

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