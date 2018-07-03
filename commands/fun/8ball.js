const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')

class Ball extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'8Ball',
          description: "Get random responses back from 8ball!",
          guildOnly:true,
          usage: "",
          perms:['EMBED_LINKS']
      })
  }

async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    if(!args[0]) return message.channel.send("Give me a question, not just empty!");
    let replies = ["Yes", "No", "Maybe", "I don't know", "uwu ask me later, I'm busy", "I'm a derp", "Hmmm.. ask me later!~", "Merp, I dunno", "It's likely", "I dunno..", "Oof", "Nah man", "Yeahhhh", "Well.. lemme get back to you on that..", "Reco is a massive derp, bot has spoken."]

    let result = Math.floor((Math.random() * replies.length))
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setColor(`RANDOM`)
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setFooter("Random Replies for 8Ball")

    message.channel.send(ballembed);



}
}
module.exports = Ball;