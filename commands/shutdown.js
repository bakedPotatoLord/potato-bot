const { SlashCommandBuilder } = require('@discordjs/builders');
const {client} = reqire("../index.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shut down the server'),
	async execute(interaction) {
        if(interaction.user.id == "750347468826345492"){
            client.destroy()
        }
		return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};