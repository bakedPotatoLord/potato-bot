const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises")

module.exports={
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription("echoes user input")
        .addStringOption(option => 
            option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true)),

        async execute(interaction){

            let data = await fs.readFile("users.json","utf-8")

            return interaction.reply(`you said: \n\n"${interaction.options.getString("input")}" `)
        }
}

