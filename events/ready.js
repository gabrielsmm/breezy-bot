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

		client.user.setAvatar('https://i.pinimg.com/564x/68/a7/b2/68a7b2b1446709ab30f09230fb1ab0da.jpg');

		console.log(`\nTudo certo meu irmão!\n`);
	}
};