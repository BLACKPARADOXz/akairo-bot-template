const { Listener } = require('discord-akairo');
const { Message } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("messageCreate", {
            emitter: "client",
            event: "messageCreate",
            category: "client"
        })
    }
    /**
     * @param { Message } message 
     */
    async exec(message) {

        if(new RegExp(`<@!?${this.client.user.id}>`).test(message.content)) {
            message.reply(`Prefixim \`${this.client.config.bot.prefix}\``)
        };

    }
}