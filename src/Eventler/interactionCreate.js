const { Listener } = require('discord-akairo');
const { Interaction } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("interactionCreate", {
            emitter: "client",
            event: "interactionCreate",
            category: "client"
        })
    }
    /**
     * @param { Interaction } interaction 
     */
    async exec(interaction) {

        if(interaction.isCommand()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
        
        if (!command || command.ownerOnly && !interaction.client.config.bot.sahipler.some(r => r == interaction.user.id)) return;
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bu komut yürütülürken bir hata oluştu!', ephemeral: true });
        }
        
       }
    }
}