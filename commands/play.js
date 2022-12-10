const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Toca a musica desejada')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('The input to echo back')),
	async execute(interaction, client) {
        let songName = interaction.options.getString("input");
        let guildQueue = client.player.getQueue(interaction.guild.id);
        let queue = client.player.createQueue(interaction.guild.id);
        await queue.join(interaction.member.voice.channel);
        await interaction.reply(`Procurando ${songName}...`);
        let song = await queue.play(songName).catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        });
		await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Tocando agora: ${song.name}`)
                .setDescription(`Duração: ${song.duration}`)
                .setThumbnail(song.thumbnail)
                .setColor('Purple')
            ],
            ephemeral: false // true -> apenas quem mandou pode ver
        });
	},
};