class Command {
    constructor(bot, {
      name = null,
      description = "No description provided.",
      guildOnly = false,
      category = "undefined",
      usage = "undefined",
      level = "Server Member"
    }) {
      this.bot = bot;
      this.conf = {guildOnly,level};
      this.help = { name, description, category, usage};
    }
  }

  module.exports = Command;
  
  