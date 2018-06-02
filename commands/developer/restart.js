const Discord = require('discord.js');
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');

class Restart extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'restart',
          description: "Restart the bot, should automatically restart with PM2",
          level:"Bot Developer"
      })
  }


async run (message, args) { 
message.channel.send(`Restarted in ${Math.floor(this.bot.ping)}ms`).then(() =>{
process.exit(1);
})
 

}
}
module.exports = Restart;