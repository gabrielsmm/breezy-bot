const { Events, ActivityType } = require('discord.js');
const cron = require('cron');
const promoMessage = require('../others/promoMessage');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {		
		client.user.setPresence({
			activities: [{ 
				name: `varias paradas`, 
				type: ActivityType.Listening }],
				status: 'online', // online, idle, dnd, offline
		});

		// Executa todos os dias às 18:00:00
		let scheduledMessage = new cron.CronJob('00 00 18 * * *', () => {
			promoMessage.execute(client);
		}, null, true, 'America/Sao_Paulo');

		// Executa a cada 10 segundos 
		// let scheduledMessage = new cron.CronJob('*/10 * * * * *', () => {
		// 	promoMessage.execute(client);
		// });
		
		scheduledMessage.start();

		console.log(`\nTudo certo meu irmão!\n`);
	}
};