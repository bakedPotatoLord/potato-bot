const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJSON.js');
const { MessageEmbed } = require('discord.js');

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

                await interaction.reply( {embeds:[new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${interaction.options.getUser("user").tag}'s stats:`)
                    //.setDescription('this dude kinda boolin')
                    .setImage(interaction.options.getUser("user").displayAvatarURL({ dynamic: true }))
                    .addFields(
                        { name: '🟨Balance', value: userData.balance.toString(), inline:true},
                        { name: '🟩Health', value: userData.health.toString(), inline: true },
                        { name: '🟦Energy', value: userData.energy.toString(), inline: true },
                        { name: '🟥Atk', value: userData.atk.toString(), inline: true },
                        { name: '🟫Def', value: userData.def.toString(), inline: true },
                        { name: '🥔Potatoes', value: userData.potatoes.toString(), inline: true },
                    )
    
                    .setTimestamp()
                    .setFooter({ text: 'only losers read the footer'})
                    ]})
            }else{
                return interaction.reply('i got no idea who this is. have them register')
            }
        }
}