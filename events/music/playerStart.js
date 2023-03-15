const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'playerStart',
	async execute(queue, track) {
        let embed = new EmbedBuilder()
        .setTitle(`Tocando agora: ${track.title}`)
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