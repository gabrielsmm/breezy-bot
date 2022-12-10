const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Para a música que está tocando'),
	async execute(message, client, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.stop();
		await message.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Parando de tocar...`)
                .setColor('Purple')
            ],
            ephemeral: false // true -> apenas quem mandou pode ver
        });
	},
};