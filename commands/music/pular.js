const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pular')
		.setDescription('Pular a música que está tocando no momento'),
	async execute(interaction, client) {
        try {
            const queue = useQueue(interaction.guild.id);

            if (queue.size === 0) {
                await interaction.reply({ content: 'Não consigo pular essa meu nobre, está na última música 🤨' });
                return;
            }

            queue.node.skip();

            await interaction.reply({ content: 'Pulando para a próxima música... 🫡' });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'A fila está vazia, não encontrei a próxima música 😵' });
        }
	},
};