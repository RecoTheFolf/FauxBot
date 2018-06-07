const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const youtube = require('simple-youtube-api')


class Skip extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'skip',
          description: "skips what is currently playing",
          guildOnly: true,
          level:"Server DJ",
          usage: "",
          perms:['CONNECT','SPEAK']
      })
  }
async run (message, args) {
if (!message.member.voiceChannel) return [0,'You must be in a voice channel to use this']
message.guild.voiceConnection.dispatcher.end()
message.channel.send(`Skipped!`)
}
}

module.exports = Skip;