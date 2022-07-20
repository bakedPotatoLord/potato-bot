const fs = require("fs/promises")
const {mapToJSON,JSONToMap} = require('../helpers/mapToJson')

async function editUsers(){
    let data = JSONToMap( await fs.readFile("users.json","utf-8") )

    for(i of data){
        let userData = data.get(i[0])
        //put user manipulations here

        userData.energy = 10

        data.set(i[0],userData)
    }
    await fs.writeFile('users.json',mapToJSON(data))
}

editUsers()

