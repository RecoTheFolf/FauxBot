const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const youtube = require('simple-youtube-api')


class Play extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'play',
          description: "Play media from youtube",
          guildOnly: true,
          level:"Server DJ",
          usage: "<ytlink>",
          perms:['CONNECT','SPEAK']
      })
  }

async run (message,args) {
    const YouTube = new youtube(this.bot.tokens.ytKey)
    if (!message.member.voiceChannel) return [0,'You must be in a voice channel to use this']
    if (!message.member.voiceChannel.permissionsFor(message.guild.me).has(['CONNECT','SPEAK'])) return [0,'I am missing the necessary permissions to join and play audio in the voice channel'];
    if (args.length === 0) return [0,"You need to input a search query"]
    const results = await YouTube.searchVideos(args.join(' '),5) 
var resultStore = new Discord.Collection();
var selection = null

var i = 0
for (var b in results) {
    const tSong = await YouTube.getVideoByID(results[i].id);
    tSong.num = i + 1
    tSong.requester = message.author
    if (tSong.duration.minutes < 16 && tSong.duration.hours === 0) {
        resultStore.set((i + 1).toString(),tSong);
    i++
    }
}
console.log(resultStore)
if (resultStore.size === 0) return [0,'No results'];
this.bot.test = resultStore
//resultStore = await resultStore.filter(r => r.duration.minutes < 16 && r.duration.hours === 0)
if (resultStore.size === 0) return [0,"Results were found, but all results are over 16 minutes long"]

if (resultStore.size === 1) {
selection = resultStore.first()
} else { 
const choice = resultStore.get(args[0]) ? args[0] : await this.bot.awaitReply(message,`${resultStore.map((r,i) => `${i} | \`${r.title}\` | ${r.duration.minutes ? `${r.duration.minutes} minutes ${r.duration.seconds ? `and ${r.duration.seconds} seconds` : ``}` : `${r.duration.seconds} seconds`}`).join('\n')}`)
selection = resultStore.get(choice)
if (choice === 'no_response') return [0,"No response was received in time.  Cancelling"]
if (!selection) return [0,"Invalid entry"]
}

const queue = message.guild.streamData.get('queue')
queue.push(selection)
message.guild.streamData.set('queue',queue)
if (queue.length === 1) {
   await message.member.voiceChannel.join().catch(e => message.channel.send(':x: User is no longer in voice channel.  Cancelling'))
    if (!message.guild.voiceConnection) return;
message.guild.streamData.set('voiceChannel',message.guild.me.voiceChannel)
message.guild.streamData.set('displayChannel',message.channel)
this.bot.play(message.guild)
} else {
message.channel.send(`Enqueued \`${selection.title}\``)
message.guild.streamData.set('displayChannel',message.channel)
}

//await vChannel.join().then(c => {return c.play(ytdl(current.id, { audioonly: true }), { passes: 3 }) });
}
}

module.exports = Play;
