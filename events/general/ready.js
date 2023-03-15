const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {		
		client.user.setPresence({
			activities: [{ 
				name: `varias paradas`, 
				type: ActivityType.Listening }],
				status: 'online', // online, idle, dnd, offline
		})

		console.log(`\nTudo certo meu irmão!\n`);
	}
};