const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Pular a música que está tocando no momento'),
	async execute(message, client, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        console.log(guildQueue);
        guildQueue.skip();
		await message.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Pulando para a próxima música...`)
                .setColor('Purple')
            ],
            ephemeral: false // true -> apenas quem mandou pode ver
        });
	},
};