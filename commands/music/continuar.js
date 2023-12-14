const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('continuar')
		.setDescription('Continua tocando a música que foi pausada'),
	async execute(interaction, client) {
        try {
            const queue = useQueue(interaction.guild.id);

            queue.node.setPaused(false);

            await interaction.reply({ content: 'Voltando a tocar... 🫡' });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Não tem nada pausado no momento 🤔' });
        }
	},
};