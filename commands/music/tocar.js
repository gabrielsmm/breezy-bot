const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tocar')
		.setDescription('Toca a música desejada')
        .addStringOption(option =>
            option.setName('musica')
            .setDescription('A música que deseja tocar')
            .setRequired(true)),
	async execute(interaction, client) {
        try {
            const player = useMainPlayer();

            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('Opa meu guerreiro, parece que você não está em uma call 🤔');

            const songNameToSearch = interaction.options.getString('musica');

            const queue = useQueue(interaction.guild.id);

            await interaction.deferReply({ ephemeral: false });

            const { track } = await player.play(channel, songNameToSearch, {
                nodeOptions: {
                    metadata: interaction.channel
                }
            });
            
            if (queue) {
                return interaction.followUp(`Adicionando ${track.title}... 🫡`);
            } else {
                return interaction.followUp(`Tocando ${track.title}... 🫡`);
            }
        } catch (error) {
            console.log(error);
            return interaction.followUp(`Ocorreu um erro, tente novamente mais tarde 😵‍💫`);
        }
	},
};