class Command {
    constructor(bot, {
      name = null,
      description = "No description provided.",
      guildOnly = false,
      category = "undefined",
      usage = "undefined",
      level = "Server Member",
      perms = []
    }) {
      this.bot = bot;
      this.conf = {guildOnly, level, perms};
      this.help = { name, description, category, usage};
    }
  }

  module.exports = Command;
  
  