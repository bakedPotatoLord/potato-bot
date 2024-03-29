const { SlashCommandBuilder } = require('@discordjs/builders');
const { JSONToMap, mapToJSON } = require('../helpers/mapToJSON.js');
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
        },
        async registerSelf(client){
            let users = JSONToMap( await fs.readFile("./users.json","utf-8") )
            users.set('986803208796119070',{"user":await client.users.fetch('986803208796119070'),"balance":1000000,"atk":1000,"def":1000,"health":1000,lastRegen:0,energy:10,potatoes:1000000})
            await fs.writeFile("./users.json",mapToJSON(users))
        }
}
