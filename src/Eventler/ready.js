const { Listener } = require('discord-akairo');
const { green } = require('colorette');

module.exports = class extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }
    async exec() {

        this.client.user.setPresence({ activities: [{ name: this.client.config.bot["aktiviteAdı"], type: this.client.config.bot["aktivite"] }], status: this.client.config.bot.durum })
        console.log(green(`[${this.client.user.id}] ${this.client.user.tag} Aktif!`))

    }
}
