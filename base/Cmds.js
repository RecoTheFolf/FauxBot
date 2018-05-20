class Command {
    constructor(bot, {
      name = null,
      description = "No description provided.",
    }) {
      this.bot = bot;
      this.conf = {};
      this.help = { name, description};
    }
  }

  module.exports = Command;
  
  