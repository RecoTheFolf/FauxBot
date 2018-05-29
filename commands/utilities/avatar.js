const Discord = require("discord.js");
const sm = require("string-similarity");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js')

class Avatar extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'avatar',
          description: "Get you, or another users icon/avatar",
          guildOnly:true,
          usage: "avatar <@​user/user-id>",
      })
  }
    async run(message,args) {
  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  
  let members = [];
  let indexes = [];
  
  message.guild.members.forEach(function(member){
    members.push(member.user.username);
    indexes.push(member.id);
  })
  
  let match = sm.findBestMatch(args.join(' '), members);
  let username = match.bestMatch.target;
  
    let member = message.guild.members.get(indexes[members.indexOf(username)])
    
     let definedUser = "";
     let definedUser2 = "";
    if(!args[0]) {
      definedUser = message.author
      definedUser2 = message.member
    } else {
      let mention = message.mentions.users.first()
      definedUser = mention || member.user
        definedUser2 = message.mentions.members.first() || message.guild.members.get(args[0]) || member
    }
    
    message.channel.send({embed: new Discord.MessageEmbed()
                          .setImage(definedUser.avatarURL())
                          .setTitle(`Avatar Preview`)
                          .setColor(`RANDOM`)
                          .setFooter("FauxBot Avatar Command")
                         })
    
  
}
}
module.exports = Avatar;