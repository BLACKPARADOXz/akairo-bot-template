const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { ClientOptions, Collection } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { red } = require('colorette');
const fs = require('fs');
const { join } = require('path');
const YAML = require("yawn-yaml/cjs");

const ayar = new YAML(fs.readFileSync("./ayarlar.yaml").toString()).json;

module.exports = class BotClient extends AkairoClient {
    slashCommands = new Collection();
    config = ayar
    /**
     * @type { CommandHandler } commandHandler
     */
    commandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'Komutlar'),
        prefix: (message) => {
            return ayar.bot.prefix;
        },
        aliasReplacement: /-/g,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                modifyRetry: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                timeout: `Sanırım çok uzun sürdü, komut iptal edildi.`,
                ended: `3'ten fazla denemeye rağmen hala tam olarak anlayamadınız. Komut iptal edildi.`,
                cancel: `Komut iptal edildi.`,
                cancelWord: "iptal",
                retries: 3,
                time: 30000,
            },
            otherwise: '',
        },
    });

    listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'Eventler') });

    /**
     * 
     * @param { ClientOptions } options
     */
    constructor(options) {
        super({ ownerID: ayar.bot.sahipler }, {
            ...options
        });


        process.on('unhandledRejection', (err) => console.error(err));
    }

     async _initSlashCommands() {
        //if (!this.application?.owner) await this.application?.fetch();
        const commands = [];
        const commandFiles = fs.readdirSync('./src/SlashKomutlar').filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
            const command = require(`../SlashKomutlar/${file}`);
            if (command.data && command.data.name) {
                this.slashCommands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            }
        }
    
        const rest = new REST({ version: '9' }).setToken(this.token);
        
            try {
                console.log('Started refreshing application (/) commands.');
        
                await rest.put(
                    //@ts-ignore
                    Routes.applicationCommands(this.user.id),
                    { body: commands },
                );
        
                console.log(`${commands.length} komut yüklenicek`);
            } catch (error) {
                console.error(error);
            }

        console.log("Slash Command handler yüklendi.")
    }

    async setup() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll()
        console.log(`Command handler yüklendi.`)
        this.listenerHandler.loadAll()
        console.log(`Event Handler yüklendi.`)
    }

    async start() {
        await this.setup();
        return this.login(ayar.bot.token).then(async () => await this._initSlashCommands()).catch(() => console.log(red("Ayarlar.yaml' da geçerli bir token girmeniz gerekiyor.")))
    }

}

