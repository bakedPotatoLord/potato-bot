const { SlashCommandBuilder } = require('@discordjs/builders');
const { AnonymousGuild } = require('discord.js');
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

                let p1Data = data.get(interaction.user.id)
                let p2Data = data.get(interaction.options.getUser("user").id)

                if(p1Data.energy > 0){
                    if(interaction.options.getUser("user").id == interaction.user.id ){
                        return interaction.reply('you cant fight yourself ')
                    }else{
                        await interaction.reply(fightString)
                        await new Promise(res=>{setTimeout(res,1000)})
    
                        
    
                        p1Data.energy --
    
                        if(p1Data.atk > p2Data.def){
                            fightString+=`<@${p1Data.user.id}> attacks, causing 1 damage\n`
                            p2Data.health --
                        }else{
                            fightString+=`<@${p1Data.user.id}> attacks, causing 0 damage\n`
                        }
                        await interaction.editReply(fightString)
    
                        //wait for a second
                        await new Promise(res=>{setTimeout(res,1000)})
    
                        if(p2Data.atk > p1Data.def){
                            fightString+=`<@${p2Data.user.id}> attacks, causing 1 damage\n`
                            p1Data.health --
                        }else{
                            fightString+=`<@${p2Data.user.id}> attacks, causing 0 damage\n`
                        }
                        await interaction.editReply(fightString)
    
                        await new Promise(res=>{setTimeout(res,1000)})

                        let stealAmmount = Math.floor(Math.random()*3)

                        if(p2Data.atk +p2Data.def > p1Data.def+p1Data.atk ){
                            fightString+=`<@${p2Data.user.id}> steals ${stealAmmount} coins from <@${p1Data.user.id}>\n`
                            p2Data.balance+=stealAmmount
                            p1Data.balance-=stealAmmount
                        }else if(p2Data.atk +p2Data.def < p1Data.def+p1Data.atk ){
                            fightString+=`<@${p1Data.user.id}> steals ${stealAmmount} coins from <@${p2Data.user.id}>\n`
                            p1Data.balance+=stealAmmount
                            p2Data.balance-=stealAmmount
                        }else{
                            fightString+=`you knock each other out at the same time, causing you to both lose ${stealAmmount}`
                            p2Data.balance-=stealAmmount
                            p1Data.balance-=stealAmmount
                        }
                            
                        await interaction.editReply(fightString)
    
                        await new Promise(res=>{setTimeout(res,1000)})
    
                        fightString+="fight ended"
                        await interaction.editReply(fightString)
                        
                        await fs.writeFile("./users.json",mapToJSON(data))
                        return
                    }
                }else{
                    return await interaction.reply("fighting uses energy. You currently have none")
                }

                

                
            }else{
                return interaction.reply('both users must be registered')
            }
        }
}