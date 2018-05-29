module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run() {
    const Discord = require('discord.js');

    console.info(`${this.bot.user.username} is online and in ${this.bot.guilds.size} servers!`);
    this.bot.user.setActivity("Use --help for a list of commands" + `\n\n| in ${this.bot.guilds.size} server(s)!`);

    this.bot.sets = {}
    for (var s in this.bot.config.defaultSettings) {
        this.bot.sets[s] = this.bot.config.defaultSettings[s].value
    }

    this.bot.guilds.forEach(async g => {
        console.info(`Running for ${g.name}`)
        const settings = await this.bot.settings.get(g.id).getField('settings').run().catch(async e => {
            //if no settings
            g.new = true
            console.log("Adding settings to DB")
            await this.bot.settings.insert({id:g.id,settings:this.bot.sets}).run()
            return false
        });
       if (settings) {
        for (var s in this.bot.config.defaultSettings) {
            if (!settings[s]) {//If a new setting has been added, and it is not added to server settings db
                console.log(`Adding ${s} to ${g.name}'s database`)
                settings[s] = this.bot.sets[s]
                await this.bot.settings.get(g.id).update({settings:settings}).run()
            }
            for (var s in settings) {
                if (!this.bot.config.defaultSettings[s]) {
                    console.log(`Removing ${s} from ${g.name}'s database`)
                    console.log(settings)
                    await delete settings[s];
                    console.log(settings)
                    await this.bot.settings.get(g.id).update({settings:settings}).run();
                }
            }
        }
       }
      }
    )
}

}