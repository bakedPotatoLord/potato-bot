const {mapToJSON,JSONToMap} = require('../helpers/mapToJson')
const fs = require("fs/promises")
const { User } = require('discord.js')

module.exports= {
    async registerSelf(){
        let users = JSONToMap( await fs.readFile("./users.json","utf-8") )

        if(!users.has('986803208796119070')){
            users.set('986803208796119070',{"user":{username:"PotatoBot"},"balance":1000000,"atk":1000,"def":1000,"health":1000,lastRegen:0,energy:10})
            await fs.writeFile("./users.json",mapToJSON(users))
        }
    }
}


