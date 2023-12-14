const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pausar')
		.setDescription('Pausa a música que está tocando'),
	async execute(interaction, client) {
        try {
            const queue = useQueue(interaction.guild.id);

            queue.node.setPaused(true);

            await interaction.reply({ content: 'Pausando... 🫡' });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Não tem nada tocando no momento 🧐' });
        }
	},
};