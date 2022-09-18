const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJson.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('allowance')
        .setDescription("adds money to your acct"),

        async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            if(data.has(interaction.user.id)){

                let userData = data.get(interaction.user.id)

                if( Date.now() - userData.lastAllowance  <= 86400000){
                    return await interaction.reply(`you must wait until ${new Date(userData.lastRegen+ 86400000)} to get your allowance again`)
                }else{
                    userData.balance +=20
                    userData.lastAllowance = Date.now()

                    await interaction.reply('Transferring')
                    for(let i = 0 ;i<10;i++){
                        let allowanceString ='Transferring\n'
                        for(j=0;j<10;j++){
                            if(j>i){
                                allowanceString +='⬜'
                            }else{
                                allowanceString +='🟨'
                            }
                        }
                        await interaction.editReply(allowanceString)
                        await new Promise(res=>setTimeout(res,250+Math.floor(Math.random()*500)))
                    }
                    await interaction.editReply(`Transfer complete. Balance is now ${userData.energy}`)
                }

                data.set(interaction.user.id,userData)
                await fs.writeFile('users.json',mapToJSON(data))
                return
            }else{
                return interaction.reply('register to use /allowance')
            }
        }
}