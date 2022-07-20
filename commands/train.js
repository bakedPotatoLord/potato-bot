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


            if( Date.now() - userData.lastTrain  <= 60000){
                return await interaction.reply(`Slow down there Chad. you must wait ${Math.round(60-(Date.now() - userData.lastTrain)/1000)} more secs to train again`)
            }else{
                userData.lastTrain = Date.now()

                if(interaction.options.getString("stat")=="atk"){
                    userData.atk +=1
                    await interaction.reply(`trained atk. atk is now ${userData.atk}`)
                }else if(interaction.options.getString("stat")=="def"){
                    userData.def+=1
                    await interaction.reply(`trained def. def is now ${userData.def}`)
                }
            }

            data.set(interaction.user.id, userData )
            await fs.writeFile("users.json",mapToJSON(data))

            return 
        }
}
