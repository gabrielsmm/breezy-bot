const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pular')
		.setDescription('Pular a música que está tocando no momento'),
	async execute(interaction, client) {
        try {
            let guildQueue = client.player.getQueue(interaction.guild.id);
            let song = guildQueue.nowPlaying;
            for (const [i, s] of guildQueue.songs.entries()) {
                if (song.name === s.name && guildQueue.songs.length-1 === i) {
                    await interaction.reply({ content: 'Não foi possível pular, está na última música da fila', ephemeral: false });
                    return;
                }
            }
            await guildQueue.skip(); //pulando musica
            guildQueue = client.player.getQueue(interaction.guild.id); // obtendo a fila atualizada
            await interaction.reply({ content: 'Pulando para a próxima música...', ephemeral: false });
            song = guildQueue.nowPlaying;
            let embed = new EmbedBuilder()
            .setTitle(`Tocando agora: ${song.name}`)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor('Purple')
            .addFields(
                { name: 'Duração', value: song.duration, inline: true },
                { name: 'Autor', value: song.author, inline: true },
            );
            await interaction.channel.send({
                embeds: [embed],
                ephemeral: false // true -> apenas quem mandou pode ver
            });
        } catch (error) {
            await interaction.reply({ content: 'A fila está vazia, não encontrei a próxima música', ephemeral: true });
            console.log(error);
        }
	},
};