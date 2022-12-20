const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('servidor')
		.setDescription('Retorna informações sobre o servidor.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Esse servidor é o ${interaction.guild.name} e possui ${interaction.guild.memberCount} membros.`);
	},
};