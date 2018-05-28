module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run() {
    const Discord = require('discord.js');

    console.info(`${this.bot.user.username} is online and in ${this.bot.guilds.size} servers!`);
    this.bot.user.setActivity("on Development Branch v0.3! | Use --help for a list of commands");

}

}