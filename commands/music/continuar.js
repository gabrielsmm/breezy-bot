const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('continuar')
		.setDescription('Continua tocando a música que foi pausada'),
	async execute(interaction, client) {
        try {
            let guildQueue = client.player.getQueue(interaction.guild.id);
            guildQueue.setPaused(false);
            const message = await interaction.reply({ content: 'Continuando...', fetchReply: true });
            message.react('✅');
        } catch (error) {
            await interaction.reply({ content: 'Não tem nada pausado no momento', ephemeral: true });
            console.log(error);
        }
	},
};