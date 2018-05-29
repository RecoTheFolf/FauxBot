module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(guild) {

await this.bot.settings.insert({id:guild.id,settings:this.bot.sets}).run(); //Add default settings to server DB
}

}
