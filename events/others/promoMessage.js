const { EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');
const { channel_promo } = require('../../config.json');
const linkSteamApi = 'https://store.steampowered.com/api/featuredcategories/?l=portuguese';

function formatarMoeda(valor) {
	const numeroFormatado = parseFloat((valor / 100).toFixed(2));
	return numeroFormatado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

module.exports = {
	async execute(client) {
        try {
			const response = await axios.get(linkSteamApi);

			const promos = response.data.specials.items;

			if (promos === null || promos === undefined) return;

			let embeds = [];

			promos.forEach((promo) => {
				let embed = new EmbedBuilder()
				.setTitle(promo.name)
				.setColor('Purple')
				.addFields(
					{ name: 'Preço hoje:', value: formatarMoeda(promo.final_price), inline: true },
					{ name: 'Preço original:', value: formatarMoeda(promo.original_price), inline: true },
					{ name: 'Desconto:', value: `${promo.discount_percent}%`, inline: true },
				)
				.setImage(promo.small_capsule_image)
				.setThumbnail('https://store.cloudflare.steamstatic.com/public/images/v6/logo_steam_footer.png')
				.setURL(`https://store.steampowered.com/app/${promo.id}`)
				.setTimestamp();
				embeds.push(embed);
			});

			if (embeds.length > 10) embeds = embeds.slice(0, 10);

			const guilds = client.guilds.cache.map(guild => guild.id);

			guilds.forEach((guildId) => {
				const guild = client.guilds.cache.get(guildId);
				const channel = guild.channels.cache.find(ch => ch.name === channel_promo);
				if (channel === null || channel === undefined) return;
				channel.send('Opa @everyone, tô chegando com as promoções quentinhas de hoje, aproveitem!');
				channel.send({ embeds: embeds });
			});
		} catch (error) {
			console.log(error);
		}
	},
};