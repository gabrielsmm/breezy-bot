const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const directories = fs.readdirSync('./commands');
directories.forEach((dir) => {
	fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
	.forEach((file) => {
		const command = require(`./commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
	});
});

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();