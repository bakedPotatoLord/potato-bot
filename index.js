const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, Emoji, ReactionEmoji, MessageReaction } = require('discord.js');
const { token } = require('./config.json');
const { ClientRequest } = require('node:http');
const disses = require("./disses.json") 

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', message => {
	console.log("recived a message")

	if(message.author.id == "790765656571379762" || message.content.toLowerCase() == "diss me"){

		message.react('😡')
		message.reply(disses[Math.floor(Math.random()*disses.length)])
	}
	

});


client.login(token);

