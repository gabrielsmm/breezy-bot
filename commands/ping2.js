const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('ping2')
		.setDescription('Replies with Pong!2'),
    
        async execute (client, interaction, config, db) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Pong! ${Math.round(client.ws.ping)}ms!`)
                .setColor('Red')
            ],
            ephemeral: true
        })
    }
};