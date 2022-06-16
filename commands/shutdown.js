const { SlashCommandBuilder } = require('@discordjs/builders');
const {client} = require("../index.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shut down the server'),
	async execute(interaction) {
        if(interaction.user.id == "750347468826345492"){
            client.destroy()
            process.exit()
        }else{
            return interaction.reply(`no way you loser`);
        }
		
	},
};