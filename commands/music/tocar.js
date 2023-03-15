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
                await interaction.editReply({ content: 'Adicionando `'+songNameToSearch+'`...', ephemeral: false });
            } else {
                await interaction.editReply({ content: 'Tocando `'+songNameToSearch+'`...', ephemeral: false });
            }
        } catch (error) {
            await interaction.editReply({ content: 'Você precisa estar em uma call para ouvir músicas!', ephemeral: true });
            console.log(error);
        }
	},
};