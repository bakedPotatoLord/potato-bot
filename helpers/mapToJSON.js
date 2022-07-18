module.exports={
    mapToJSON:(map)=>{return JSON.stringify(Object.fromEntries(map))},
    JSONToMap:(json)=>{return new Map(Object.entries(JSON.parse(json)))}
}