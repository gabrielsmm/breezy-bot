const { Events, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { channel_welcome } = require('../../config.json');
const linkGenerator = 'https://api.discorddevtools.xyz/welcome-image-generator/generate.png?';

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {

        if(!member.guild) return;

        const parameters = `username=${member.user.username}&usernameColor=FFF&discriminatorColor=FFF&title=Bem+vindo+ao+${member.guild.name}!&titleColor=C0C0C0&text=%20&textColor=C0C0C0&borderColor=C0C0C0&background=https://img.freepik.com/vetores-gratis/forma-diagonal-geometrica-abstrata-em-fundo-escuro_1409-1819.jpg&image=${member.user.displayAvatarURL({ extension: 'jpg' })}`;

        let link = linkGenerator + parameters;

        const file = new AttachmentBuilder(link, { name: 'welcome.png' });
        const welcomeEmbed = new EmbedBuilder()
        .setColor('Purple')
        .setDescription(`Opa ${member.user}, espero que você encontre novos amigos por aqui! 🤗`)
        .setImage(`attachment://welcome.png`);

        const channel = member.guild.channels.cache.find(ch => ch.name === channel_welcome);

        if (channel === null || channel === undefined) return;

        channel.send({ embeds: [welcomeEmbed], files: [file] });
	},
};