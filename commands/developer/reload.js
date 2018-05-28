const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');


class Reload extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'reload',
          description: "Reloads any command specified.",
          guildOnly:true
      })
  }


async run (message, args) {
  let embed = new Discord.MessageEmbed()
  .setTitle("Reload")
  .setDescription("Sorry, the `reload` command can only be executed by the Bot Developers.")
  .setColor("#cdf785");
  if(!this.bot.config.developers.includes(message.author.id)) return message.channel.send(embed);

  try{
    //delete require.cache[require.resolve(`./${args[0]}.js`)];
    const cmd = this.bot.commands.get(args[0])
    if (!cmd) return message.channel.send(`${args[0]} is not a command!`)

    this.bot.commands.set(args[0],new (require(`../${cmd.conf.category}/${args[0]}.js`))(this.bot))
  let Aembed = new Discord.MessageEmbed()
  .setTitle("Reloading..")
  .setColor("RANDOM")
  .setDescription(`${args[0]}.js successfully reloaded!`)
  .setFooter("FauxBot Reload Command")

    return message.channel.send(Aembed);
     }catch(e){
     return message.channel.send("There is no such command!")
     }
}
}
module.exports = Reload;