const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com um Pong!'),
	async execute(interaction, client) {
		await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Pong! ${Math.round(client.ws.ping)}ms!`)
                .setColor('Purple')
            ],
            ephemeral: false // true -> apenas quem mandou pode ver
        });
	},
};