const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJson');

module.exports={
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription("views the stats of a user")
        .addUserOption(option => 
            option.setName('user')
            .setDescription('The user to check')
            .setRequired(true)
        ),

        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            if(data.has(interaction.options.getUser("user").id)){
                let userData = data.get(interaction.options.getUser("user").id)

                return interaction.reply(`
                ${interaction.options.getUser("user")}'s stats: \n
                Balance: ${userData.bal}\n
                Health: ${userData.health}\n
                Atk: ${userData.atk}\n
                Def: ${userData.def}
                `)
            }else{
                return interaction.reply('i got no idea who this is. have them register')
            }
        }
}