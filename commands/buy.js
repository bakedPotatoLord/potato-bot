const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs/promises");
const { JSONToMap, mapToJSON } = require('../helpers/mapToJson');

module.exports={
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription("Buy something")
        /*
        .addStringOption(option => 
            option.setName('item')
            //.setDescription('The item that you wish to buy')
            .setRequired(true)
            .addChoices(
                {name:"potato ($0.10 each)",value:{name:'potato',cost:0.1}},
            )
        )
        .addIntegerOption(option => 
            option.setName('ammount')
            //.setDescription('Ammount of the product to buy')
            .setRequired(true)
        )
            */
        ,async execute(interaction){

            let data = JSONToMap( await fs.readFile("users.json","utf-8") )

            let userData = data.get(interaction.user.id)

            if(data.has(interaction.user.id)){
                if(interaction.options.getIntegerOption('ammount') > 0 ){
                    if(interaction.options.getIntegerOption('ammount')*interaction.options.getStringOption('item').cost > userData.balance){
                        userData.balance -= interaction.options.getIntegerOption('ammount')*interaction.options.getStringOption('Item').cost
                        if(interaction.options.getStringOption('item').name == 'potato'){
                            userData.potatoes += interaction.options.getIntegerOption('ammount')
                        }
                    }else{
                        return interaction.reply('you cant afford that')
                    }
                }else{
                    return interaction.reply('you have to buy at least one product')
                }
            }else{
                return interaction.reply('you must be registerd to buy things')
            }


            data.set(interaction.user.id, userData )
            await fs.writeFile("users.json",mapToJSON(data))

            return 
        }
}
