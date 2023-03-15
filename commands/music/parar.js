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

            const message = await interaction.reply({ content: 'Missão concluída, até mais...', fetchReply: true });

            message.react('✅');
        } catch (error) {
            await interaction.reply({ content: 'Não tem nada tocando no momento', ephemeral: true });
            console.log(error);
        }
	},
};