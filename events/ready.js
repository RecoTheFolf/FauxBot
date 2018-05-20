module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run() {
    console.info(`${this.bot.user.username} is online and in ${this.bot.guilds.size} servers!`);
    this.bot.user.setActivity("on Development Branch v0.1!");
    
}

}