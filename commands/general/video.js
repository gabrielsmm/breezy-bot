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

            await interaction.deferReply({ ephemeral: false });

            const response = await axios.get(linkFileDownloader + link);

            if (response.data.download_url === null || response.data.download_url === undefined) {
                await interaction.editReply({ content: 'Não foi possível converter o vídeo', ephemeral: false });
                return;
            }

            const downloader = new Downloader({
                url: response.data.download_url,
                directory: './videos',
                fileName: `${usuario}.mp4`,
                onProgress: function (percentage) {
                    console.log("% ", percentage);
                },
            });

            try {
                await downloader.download();
            } catch (error) {
                await interaction.editReply({ content: 'Erro ao baixar o vídeo.', ephemeral: false });
                console.log(error);
                return;
            }

            await interaction.channel.send({
                files: [`./videos/${usuario}.mp4`]
            });

            await interaction.editReply({ content:'Baixado!', ephemeral: false });

            // limpando a pasta
            fs.emptyDirSync('./videos');
        } catch (error) {
            if (error.code === 40005) {
                interaction.editReply({ content: 'Ops, vídeo muito grande para ser enviado, desculpe.', ephemeral: false });
            } else {
                interaction.editReply({ content: 'Ocorreu um erro ao tentar baixar o vídeo.', ephemeral: false });
            }
            fs.emptyDirSync('./videos');
            console.log(error);
        }
	},
};