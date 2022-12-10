const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`\nTudo certo meu irmão!\n`);
		
		client.user.setPresence({
			activities: [{ 
				name: `Toco varias parada`, 
				type: ActivityType.Playing }],
				status: 'dnd',
		})
	}
};