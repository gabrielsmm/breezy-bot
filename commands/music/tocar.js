const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMasterPlayer, useQueue } = require("discord-player");

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
            let songNameToSearch = interaction.options.getString('musica');

            const player = useMasterPlayer();

            const queue = useQueue(interaction.guild.id);

            await interaction.deferReply({ ephemeral: false });

            await player.play(interaction.member.voice.channel, songNameToSearch, {
                nodeOptions: {
                    metadata: interaction.channel
                }
            });
            
            if (queue) {
                await interaction.editReply({ content: 'Adicionando `'+songNameToSearch+'`... 🫡' });
            } else {
                await interaction.editReply({ content: 'Tocando `'+songNameToSearch+'`... 🫡' });
            }
        } catch (error) {
            if (String(error).includes('voice')) {
                await interaction.editReply({ content: 'Opa meu guerreiro, parece que você não está em uma call 🤔' });
            } else {
                await interaction.editReply({ content: 'Ocorreu um erro, tente novamente mais tarde 😵‍💫' });
            }
            console.log(error);
        }
	},
};