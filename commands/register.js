const { SlashCommandBuilder } = require('@discordjs/builders');
const {mapToJSON,JSONToMap} = require('../helpers/mapToJson')
const fs = require("fs/promises")

module.exports={
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("registers user with the bot"),

        async execute(interaction){

            let users = JSONToMap( await fs.readFile("./users.json","utf-8") )
            console.log(users)


            if(users.has(interaction.user.id)){
                return interaction.reply("you are already registered")
            }else{
                users.set(interaction.user.id,{"name":interaction.user.name,"balance":0,"atk":0,"def":0,"health":10})
                await fs.writeFile("./users.json",mapToJSON(users))
                return interaction.reply(`user added`)
            }

            
        }
}
