const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const youtube = require('simple-youtube-api')


class Play extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'play',
          description: "Play media on youtube",
      })
  }

async run (message,args) {
    const YouTube = new youtube(this.bot.tokens.ytKey)

}
}

module.exports = Play;
