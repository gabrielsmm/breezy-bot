const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Ajusta para o volume desejado')
        .addStringOption(option =>
            option.setName('volume')
            .setDescription('O volume que deseja colocar')
            .setRequired(true)),
	async execute(interaction, client) {
        try {
            const volume = interaction.options.getString('volume');

            if (Number.isNaN(parseInt(volume))) return interaction.reply({ content: 'Por favor especifique o volume que deseja colocar 🧐' });

            const queue = useQueue(interaction.guild.id);

            queue.node.setVolume(parseInt(volume));

            await interaction.reply({ content: `Ajustando para o volume ${volume} 🫡` });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Não tem nada tocando meu bom 🤔' });
        }
	},
};