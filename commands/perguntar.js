const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { openAiKey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perguntar')
		.setDescription('Você pergunta e eu respondo')
        .addStringOption(option =>
            option.setName('pergunta')
            .setDescription('A pergunta que deseja fazer')
            .setRequired(true)),
	async execute(interaction, client) {
        try {
            let pergunta = interaction.options.getString('pergunta');

            await interaction.deferReply({ ephemeral: false });

            const configuration = new Configuration({
                apiKey: openAiKey,
            });

            const openai = new OpenAIApi(configuration);
            
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: pergunta,
                temperature: 0.6,
                max_tokens: 2000,
            });

            let resposta = completion.data.choices[0].text.substring(0,1999).trim();

            if (resposta === "" || resposta === null || resposta === undefined) {
                await interaction.editReply({ content: "Ocorreu um erro, por favor tente mais tarde."});
                return;
            }

            await interaction.editReply({ content: resposta});
        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: "Ocorreu um erro, por favor tente mais tarde."});
        }
	},
};