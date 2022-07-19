const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports={
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("get help with commands"),

        async execute(interaction){

            return interaction.reply(`
            |name|what it do|
            |----|-----------|
            |avatar|shows a user's avatar|
            |beep|replies with boop|
            |dissme|replies with a diss|
            |echo|echoes what you say|
            |fight|starts a fight with a specified user|
            |register|registers your user with the bot|
            |server|replies with server info|
            |stats|replies witha user's stats|
            |train|trains a stat|
            |user-info|replies with user info|
            `)

        }
}