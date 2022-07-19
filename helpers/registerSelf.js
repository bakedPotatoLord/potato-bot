const {mapToJSON,JSONToMap} = require('../helpers/mapToJson')
const fs = require("fs/promises")
const { User } = require('discord.js')

module.exports= {
    async registerSelf(){
        let users = JSONToMap( await fs.readFile("./users.json","utf-8") )

        if(!users.has('986803208796119070')){
            users.set('986803208796119070',{"name":"PotatoBot","balance":0,"atk":0,"def":0,"health":10})
            await fs.writeFile("./users.json",mapToJSON(users))
        }
    }
}


