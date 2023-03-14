const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('parar')
		.setDescription('Para a música que está tocando'),
	async execute(interaction, client) {
        try {
            let guildQueue = client.player.getQueue(interaction.guild.id);
            guildQueue.stop();
            const message = await interaction.reply({ content: 'Parando de tocar...', fetchReply: true });
            message.react('✅');
        } catch (error) {
            await interaction.reply({ content: 'Não tem nada tocando no momento', ephemeral: true });
            console.log(error);
        }
	},
};