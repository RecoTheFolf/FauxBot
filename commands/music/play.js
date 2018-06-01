const Discord = require("discord.js");
const config = require("../../settings.js");
const Command = require('../../base/Cmds.js');
const youtube = require('simple-youtube-api')


class Play extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'play',
          description: "Play media on youtube",
      })
  }

async run (message,args) {
    const YouTube = new youtube(this.bot.tokens.ytKey)
    if (args.length === 0) return [0,"You need to input a search query"]
    const results = await YouTube.searchVideos(args.join(' '),3) 
const resultStore = new Discord.Collection();

await results.forEach(async (r,i) => {
    const tSong = await YouTube.getVideoByID(results[i].id);
    tSong.place = i + 1
await resultStore.set(tSong.id,tSong);
})
console.log(resultStore)
this.bot.test = resultStore
//resultStore = await resultStore.filter(r => r.duration.minutes < 16 && r.duration.hours === 0)
if (resultStore.size === 0) return [0,"Results were found, but all results are over 16 minutes long"]


}
}

module.exports = Play;
