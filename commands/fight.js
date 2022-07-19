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

            let fightString = 'fight started\n'

            if(data.has(interaction.options.getUser("user").id) && data.has(interaction.user.id)){
                await interaction.reply(fightString)
                await new Promise(res=>{setTimeout(res,1000)})

                let p1Data = data.get(interaction.user.id)
                let p2Data = data.get(interaction.options.getUser("user").id)

                if(p1Data.atk > p2Data.def){
                    fightString+=`<@${p1Data.user.id}> attacks, causing 1 damage\n`
                    //p2Data.health --
                }else{
                    fightString+=`<@${p1Data.user.id}> attacks, causing 0 damage\n`
                }
                await interaction.editReply(fightString)

                //wait for a second
                await new Promise(res=>{setTimeout(res,1000)})

                if(p2Data.atk > p1Data.def){
                    fightString+=`<@${p2Data.user.id}> attacks, causing 1 damage\n`
                    //p1Data.health --
                }else{
                    fightString+=`<@${p2Data.user.id}> attacks, causing 0 damage\n`
                }
                await interaction.editReply(fightString)

                await new Promise(res=>{setTimeout(res,1000)})

                fightString+="fight ended"
                await interaction.editReply(fightString)
                
                await fs.writeFile("./users.json",mapToJSON(data))
                return
            }else{
                return interaction.reply('both users must be registered')
            }
        }
}