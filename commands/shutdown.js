const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shut down the bot'),

	async execute(interaction) {
        if(interaction.user.id == "750347468826345492" || interaction.user.id == "530508910713372682"){

            process.exit()
        }else{
            return interaction.reply(`no way you loser`);
        }
		
	},
};