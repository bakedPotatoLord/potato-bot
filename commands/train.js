const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJson');

module.exports={
    data: new SlashCommandBuilder()
        .setName('train')
        .setDescription("trains a stat")
        .addStringOption(option => 
            option.setName('stat')
            .setDescription('The stat to train')
            .setRequired(true)
            .addChoices(
                {name:"atk",value:"atk"},
                {name:"def",value:"def"},
            )
        ),

        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            let userData = data.get(interaction.user.id)

            if(interaction.options.getString("stat")=="atk"){
                userData.atk +=1
            }else if(interaction.options.getString("stat")=="def"){
                userData.def+=1
            }
            


            data.set(interaction.user.id, userData )
            await fs.writeFile("users.json",mapToJSON(data))

            return interaction.reply(`trained atk`)
        }
}
