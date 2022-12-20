const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const Downloader = require("nodejs-file-downloader");
const fs = require('fs-extra');
const linkFileDownloader = 'https://file-downloader.net/check.php?v=';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('video')
		.setDescription('Baixa o vídeo desejado')
        .addStringOption(option =>
            option.setName('link')
            .setDescription('Link do vídeo que deseja baixar')
            .setRequired(true)),
	async execute(interaction, client) {
        try {
            let link = interaction.options.getString('link');
            let usuario = interaction.user.username;
            const response = await axios.get(linkFileDownloader + link);

            const downloader = new Downloader({
                url: response.data.download_url,
                directory: './videos',
                fileName: `${usuario}.mp4`,
                onProgress: function (percentage) {
                    console.log("% ", percentage);
                },
            });

            await interaction.deferReply();

            const {filePath, downloadStatus} = await downloader.download();

            await interaction.editReply('Baixado!');

            await interaction.channel.send({
                files: [`./videos/${usuario}.mp4`]
            });

            // limpando a pasta
            fs.emptyDirSync('./videos');
        } catch (error) {
            await interaction.reply({ content: 'Ocorreu um erro ao tentar baixar a mídia', ephemeral: true });
            console.log(error);
        }
	},
};