const exec = require('child_process').exec;
const Discord = require('discord.js');
const config = require("../settings.json");

module.exports.run = async(bot, message, args, level) => {
    let embed = new Discord.RichEmbed()
  .setTitle("Evaluation")
  .setDescription("Sorry, the `exec` command can only be executed by the Bot Owner.")
  .setColor("#cdf785");
  if(message.author.id !== config.ownerID) return message.channel.send(embed);
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    });
}
module.exports.help = {
name: "exec"
}