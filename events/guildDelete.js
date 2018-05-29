module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(guild) {

await this.bot.settings.get(g.id).delete().run().catch(console.log); //Delete server from database
}

}
