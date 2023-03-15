const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pular')
		.setDescription('Pular a música que está tocando no momento'),
	async execute(interaction, client) {
        try {
            const queue = useQueue(interaction.guild.id);

            queue.node.skip();

            await interaction.reply({ content: 'Pulando para a próxima música...', ephemeral: false });
        } catch (error) {
            await interaction.reply({ content: 'A fila está vazia, não encontrei a próxima música', ephemeral: true });
            console.log(error);
        }
	},
};