class Command {
    constructor(bot, {
      name = null,
      description = "No description provided.",
      guildOnly = false
    }) {
      this.bot = bot;
      this.conf = {guildOnly};
      this.help = { name, description};
    }
  }

  module.exports = Command;
  
  