// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require("discord-music-player");
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
									  GatewayIntentBits.GuildMessages, 
									  GatewayIntentBits.GuildVoiceStates, 
									  GatewayIntentBits.MessageContent,
									  GatewayIntentBits.GuildMembers] });

const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;

client.commands = new Collection();

// Search for all commands
const commandsPath = path.join(__dirname, 'commands');
const directories = fs.readdirSync(commandsPath);
console.log(`Carregando um total de ${directories.length} categorias.`);
directories.forEach((dir) => {
	fs.readdirSync(`${commandsPath}/${dir}/`).filter(file => file.endsWith('.js'))
	.forEach((file) => {
		const filePath = path.join(`${commandsPath}/${dir}/`, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	});
});

// Search for all events
const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath); 
console.log(`Carregando um total de ${eventsFiles.length} eventos.`);
eventsFiles.filter(file => file.endsWith('.js'))
.forEach((file) => {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
});

// Log in to Discord with your client's token
client.login(token);