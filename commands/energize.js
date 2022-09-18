const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJSON.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('energize')
        .setDescription("regenerates energy"),


        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            if(data.has(interaction.user.id)){

                

                let userData = data.get(interaction.user.id)
                if(userData.energy >= 5){
                    return await interaction.reply('energy is already maxed')
                }else if( Date.now() - userData.lastEnergize  <= 86400000){
                    return await interaction.reply(`you must wait until ${new Date(userData.lastRegen+ 86400000)} to re-energise`)
                }else{
                    userData.energy = 5
                    userData.lastRegen = Date.now()

                    await interaction.reply('energizing')
                    for(let i = 0 ;i<10;i++){
                        let healthString ='energizing\n'
                        for(j=0;j<10;j++){
                            if(j>i){
                                healthString +='⬜'
                            }else{
                                healthString +='🟦'
                            }
                        }
                        await interaction.editReply(healthString)
                        await new Promise(res=>setTimeout(res,500))
                    }
                    await interaction.editReply(`Energized. Energy is now ${userData.energy}`)
                }
                
        
                data.set(interaction.user.id,userData)
                await fs.writeFile('users.json',mapToJSON(data))
                return
            }else{
                return interaction.reply('register to use /energize')
            }
        }
}