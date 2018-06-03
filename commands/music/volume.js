const Discord = require("discord.js");
const Command = require('../../base/Cmds.js');

class Volume extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'queue',
          description: "Music Queue",
          usage: "queue",
          guildOnly:true
      })
  }

async run(message, args, level) {
if (!message.guild.voiceConnection || !message.guild.voiceConnection.dispatcher) return [0,"There is nothing playing"];
if (!message.member.voiceChannel) return [0,"You need to be in a voice channel to use this"];
let vol = args[0]
let isItADigit = /^\d+$/.test(vol);
if (!isItADigit || args.length === 0 || !parseInt(vol) || parseInt(vol) < 2 || parseInt(vol) > 200) return [0,'You need to specify a value between 1 and 200'];
message.guild.streamData.set('volume',vol / 100)
await message.guild.voiceConnection.dispatcher.setVolume(vol / 100)
message.channel.send(`Set the volume to ${vol}`)
}
}

module.exports = Volume;