// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require('discord-player');

const fs = require('node:fs');
const path = require('node:path');
const cron = require('cron');
const promoMessage = require('./events/others/promoMessage');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
									  GatewayIntentBits.GuildMessages, 
									  GatewayIntentBits.GuildVoiceStates, 
									  GatewayIntentBits.MessageContent,
									  GatewayIntentBits.GuildMembers],
									  allowedMentions: { parse: ["roles", "users"], repliedUser: true }});

const player = new Player(client);

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

// Search for all general events
const eventsPath = path.join(__dirname, 'events/general');
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

// Search for all music events
const musicEventsPath = path.join(__dirname, 'events/music');
const musicEventsFiles = fs.readdirSync(musicEventsPath); 
console.log(`Carregando um total de ${musicEventsFiles.length} eventos de música.`);
musicEventsFiles.filter(file => file.endsWith('.js'))
.forEach((file) => {
	const filePath = path.join(musicEventsPath, file);
	const event = require(filePath);
	player.events.on(event.name, (...args) => event.execute(...args));
});

// let scheduledMessage = new cron.CronJob('00 00 18 * * *', () => {
// 	// This runs every day at 18:00:00, you can do anything you want
// 	console.log('TESTANDO ENVIO DE MENSAGEM');
// });

let scheduledMessage = new cron.CronJob('*/10 * * * * *', () => {
	// This runs every day at 18:00:00, you can do anything you want
	promoMessage.execute(client);
});
  
scheduledMessage.start();

// Log in to Discord with your client's token
client.login(token);