const { SlashCommandBuilder } = require('@discordjs/builders');
const {mapToJSON,JSONToMap} = require('../helpers/mapToJson')
const fs = require("fs/promises")

module.exports={
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("registers user with the bot"),

        async execute(interaction){

            let users = JSONToMap( await fs.readFile("./users.json","utf-8") )

            if(users.has(interaction.user.id)){
                return interaction.reply("you are already registered")
            }else{
                users.set(interaction.user.id,{"user":interaction.user,"balance":0,"atk":0,"def":0,"health":10,lastRegen:0,energy:5})
                await fs.writeFile("./users.json",mapToJSON(users))
                return interaction.reply(`user added`)
            }
        }
}
