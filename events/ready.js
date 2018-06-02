module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(message, args) {
    const Discord = require('discord.js');

    let rembed = new Discord.MessageEmbed()
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor("ORANGE")
    .setThumbnail("https://cdn.discordapp.com/emojis/451575382492184588.png?v=1", true)
    .setDescription("Loading...")
    .addField("Bot is starting, please wait", "``Check console for any errors.``")
    .setTimestamp()
    .setFooter("FauxBot is currently loading..");
    this.bot.channels.get('450174829832830976').send(rembed);

    console.info(`${this.bot.user.username} is online with ${this.bot.users.size} users, in ${this.bot.channels.size} channels of ${this.bot.guilds.size} guilds.`);
    this.bot.user.setActivity("Use --help for a list of commands" + `\n\n| in ${this.bot.guilds.size} server(s)!`);
    
    let frembed = new Discord.MessageEmbed()
    .setAuthor(this.bot.user.tag, this.bot.user.displayAvatarURL())
    .setColor("GREEN")
    .setThumbnail("https://cdn.discordapp.com/emojis/451575470551465994.png?v=1", true)
    .setDescription("Ready!")
    .addField(`${this.bot.user.username}`, `Online and running!`)
    .addField(`Users:`, `${this.bot.users.size}`)
    .addField(`Channels:`, `${this.bot.channels.size}`)
    .addField(`Guilds:`, `${this.bot.guilds.size}`)
    .setTimestamp()
    .setFooter("FauxBot Loaded");
    this.bot.channels.get('450174829832830976').send(frembed);

    this.bot.sets = {}
    for (var s in this.bot.config.defaultSettings) {
        this.bot.sets[s] = this.bot.config.defaultSettings[s].value
    }

    this.bot.guilds.forEach(async g => {
        console.info(`Running for ${g.name}`)

//Start queue data
this.bot.streamData.set(g.id,new Discord.Collection())
this.bot.streamData.get(g.id).set('displayChannel',null);
this.bot.streamData.get(g.id).set('voiceChannel',null);
this.bot.streamData.get(g.id).set('queue',[]);
g.streamData = this.bot.streamData.get(g.id)



        const settings = await this.bot.settings.get(g.id).getField('settings').run().catch(async e => {
            //if no settings
            g.new = true
            console.log("Adding settings to DB")
            await this.bot.settings.insert({id:g.id,settings:this.bot.sets}).run()
            g.settings = this.bot.sets
            return false
        });
        g.settings = settings
       if (settings) {
        for (var s in this.bot.config.defaultSettings) {
            if (!settings[s]) {//If a new setting has been added, and it is not added to server settings db
                console.log(`Adding ${s} to ${g.name}'s database`)
                settings[s] = this.bot.sets[s]
                await this.bot.settings.get(g.id).update({settings:settings}).run()
                g.settings = settings
            }
            for (var s in settings) {
                if (!this.bot.config.defaultSettings[s]) {
                    console.log(`Removing ${s} from ${g.name}'s database`)
                    await delete settings[s];
                    await this.bot.settings.get(g.id).update({ settings: [] }).run();
                    await this.bot.settings.get(g.id).update({ settings: settings }).run();
                    g.settings = settings
                }
            }
        }
       }
      }
    )
    this.bot.wait(3000) //Add a three second wait so variables and other data can be set.  
}

}