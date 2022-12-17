const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Ajusta para o volume desejado')
        .addStringOption(option =>
            option.setName('volume')
            .setDescription('O volume que deseja colocar')
            .setRequired(true)),
	async execute(interaction, client) {
        try {
            let volume = interaction.options.getString('volume');
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if (Number.isNaN(parseInt(volume))) return interaction.reply({ content: 'Por favor especifique o volume que deseja colocar', ephemeral: true });
            if (guildQueue == null || guildQueue == undefined) return interaction.reply({ content: 'Não tem nada tocando no momento', ephemeral: true });
            guildQueue.setVolume(parseInt(volume));
            const message = await interaction.reply({ content: 'Ajustando para o volume `'+volume+'`', fetchReply: true });
            message.react('✅');
        } catch (error) {
            await interaction.reply({ content: 'Erro ao ajustar o volume', ephemeral: true });
            console.log(error);
        }
	},
};