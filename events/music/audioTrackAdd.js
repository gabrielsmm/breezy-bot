const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'audioTrackAdd',
	async execute(queue, track) {
        if (!queue.node.isPlaying()) return;
        let embed = new EmbedBuilder()
        .setTitle(`Adicionado à fila: ${track.title}`)
        .setThumbnail(track.thumbnail)
        .setURL(track.url)
        .setColor('Purple')
        .addFields(
            { name: 'Duração', value: track.duration, inline: true },
            { name: 'Autor', value: track.author, inline: true },
        );
        queue.metadata.send({ embeds: [embed] });
	},
};