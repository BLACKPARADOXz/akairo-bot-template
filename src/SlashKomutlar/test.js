const { CommandInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { data: new SlashCommandBuilder()
    .setName("test")
    .setDescription(`Deneme 123`),
    /**
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {  

        interaction.reply("Deneme 123")

    }
}