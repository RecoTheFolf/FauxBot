module.exports = class {
    constructor(bot) {
      this.bot = bot;
    }

async run(oldMember,newMember) {
if (oldMember.user.id === this.bot.user.id && oldMember.voiceChannel && newMember.voiceChannel) {
    if (oldMember.voiceChannel != newMember.voiceChannel) return oldMember.guild.streamData.set('voiceChannel',newMember.voiceChannel)
}

}

}
