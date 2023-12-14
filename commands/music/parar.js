const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('parar')
		.setDescription('Para a música que está tocando'),
	async execute(interaction, client) {
        try {
            const queue = useQueue(interaction.guild.id);

            queue.delete();

            await interaction.reply({ content: 'Missão concluída, até mais... 🫡' });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Não tem nada tocando no momento 🤔' });
        }
	},
};