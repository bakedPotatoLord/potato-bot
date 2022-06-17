const { SlashCommandBuilder } = require('@discordjs/builders');
const disses = require("../disses.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dissme')
		.setDescription('returns a diss'),
	async execute(interaction) {
		return interaction.reply(disses[Math.floor(Math.random()*disses.length)])
	},
};