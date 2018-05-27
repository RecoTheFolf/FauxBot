const Discord = require("discord.js");
const fs = require("fs");
const Command = require('../base/Cmds.js');

class Prefix extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'prefix',
          description: "Set the prefix for the bot",
          guildOnly:true
      })
  }


  async run (message,args) {
if (message.channel.type === 'dm') return;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:tickNo:432418492667396097> **| You don't have `ADMINISTRATOR` perms.**");
  if(!args[0]) return message.channel.send("Please specify something!")

const settings = await this.bot.settings.get(message.guild.id).getField('settings').run();
settings.prefix.value = args[0]
await this.bot.settings.get(message.guild.id).update({settings:settings}).catch(r => console.log(r))
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#FF9900")
  .setTitle("Prefix Customization")
  .setThumbnail(this.bot.user.displayAvatarURL)
  .setColor("RANDOM")
  .addField(`Set to`, `\`${args[0]}\``)
  .setFooter("FauxBot Prefix Command");

  message.channel.send(sEmbed);

}

}

module.exports = Prefix;