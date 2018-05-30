module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(guild) {

await this.bot.settings.get(guild.id).delete().run().catch(console.log); //Delete server from database
console.log("Left a guild: " + `${guild.name}`, "ID: " + `${guild.id}`);

}

}
