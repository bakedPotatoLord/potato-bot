const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJSON.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('heal')
        .setDescription("regenerates health"),


        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            if(data.has(interaction.user.id)){

                let userData = data.get(interaction.user.id)
                if(userData.health >= 10){
                    return await interaction.reply('health is already maxed')
                }else if( Date.now() - userData.lastRegen  <= 60000){
                    return await interaction.reply(`you must wait ${Math.round(60-(Date.now() - userData.lastRegen)/1000)} more secs to regenerate health`)
                }else{
                    userData.health++
                    userData.lastRegen = Date.now()

                    await interaction.reply('regenerating')
                    for(let i = 0 ;i<10;i++){
                        let healthString ='regenerating\n'
                        for(j=0;j<10;j++){
                            if(j>i){
                                healthString +='⬜'
                            }else{
                                healthString +='🟩'
                            }
                        }
                        await interaction.editReply(healthString)
                        await new Promise(res=>setTimeout(res,500))
                    }
                    await interaction.editReply(`health regenerated. health is now ${userData.health}`)
                }
                
        
                data.set(interaction.user.id,userData)
                await fs.writeFile('users.json',mapToJSON(data))
                return
            }else{
                return interaction.reply('register to use /regen')
            }
        }
}