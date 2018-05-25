const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../settings.js");
const Command = require('../base/Cmds.js');


class Say extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'say',
          description: "Make the bot say anything you want",
          guildOnly:true
      })
  }

async run(message, args) {

    if(!config.developers.includes(message.author.id)) return errors.noPerms(message, "BOT_DEVELOPER");
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);

}
}
module.exports = Say;