const Discord = require("discord.js");
const fs = require("fs");
const config = require("../settings.json");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Reload")
  .setDescription("Sorry, the `reload` command can only be executed by the Bot Owner.")
  .setColor("#cdf785");
  if(message.author.id !== config.ownerID) return message.channel.send(embed);

  try{
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  let Aembed = new Discord.RichEmbed()
  .setTitle("Reloading..")
  .setDescription(`${args[0]}.js successfully reloaded!`)

    return message.channel.send(Aembed);
     }catch(e){
     return message.channel.send("There is no such command!")
     }
}; 

module.exports.help = {
name: "reload"
}