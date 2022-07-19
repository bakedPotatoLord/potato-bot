const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJson');

module.exports={
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription("fight someone")
        .addUserOption(option => 
            option.setName('user')
            .setDescription('The user to fight')
            .setRequired(true)
        ),

        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            if(data.has(interaction.options.getUser("user").id) && data.has(interaction.user.id)){
                await interaction.reply('fight started')
                await new Promise(res=>{setTimeout(res,2000)})
                await interaction.editReply("fight ended")
                return
            }else{
                return interaction.reply('both users must be registered')
            }
        }
}