class Command {
    constructor(bot, {
      name = null,
      description = "No description provided.",
      guildOnly = false,
      category = "undefined"
    }) {
      this.bot = bot;
      this.conf = {guildOnly};
      this.help = { name, description, category};
    }
  }

  module.exports = Command;
  
  