const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
            let guildQueue = client.player.getQueue(interaction.guild.id);
            let queue = client.player.createQueue(interaction.guild.id);
            await queue.join(interaction.member.voice.channel);
            await interaction.reply(`Procurando por ${songNameToSearch}...`);
            let song = await queue.play(songNameToSearch).catch(err => {
                console.log(err);
                if(!guildQueue)
                    queue.stop();
            });
            let embed = new EmbedBuilder()
            .setTitle(`Tocando agora: ${song.name}`)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor('Purple')
            .addFields(
                { name: 'Duração', value: song.duration, inline: true },
                { name: 'Autor', value: song.author, inline: true },
            );
            if (queue.isPlaying) {
                embed = new EmbedBuilder()
                .setTitle(`Adicionado à fila: ${song.name}`)
                .setThumbnail(song.thumbnail)
                .setURL(song.url)
                .setColor('Purple')
                .addFields(
                    { name: 'Duração', value: song.duration, inline: true },
                    { name: 'Autor', value: song.author, inline: true },
                );
            }
            await interaction.channel.send({
                embeds: [embed],
                ephemeral: false // true -> apenas quem mandou pode ver
            });
        } catch (error) {
            await interaction.reply({ content: 'Você precisa estar em uma call para ouvir músicas!', ephemeral: true });
            console.log(error);
        }
	},
};