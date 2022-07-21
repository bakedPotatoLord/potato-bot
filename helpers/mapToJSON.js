module.exports={
    mapToJSON:(map)=>{
        for(i of map){
            let userData = i[1]
            userData.potatoes = userData.potatoes.toString()+'n'
            map.set(i[0],userData)
        }
        return JSON.stringify(Object.fromEntries(map))
    },
    JSONToMap:(json)=>{
        let map = new Map(Object.entries(JSON.parse(json)))
        for(i of map){
            let userData = i[1]
            userData.potatoes = BigInt( userData.potatoes )
            map.set(i[0],userData)
        }
        return map
    }
}