const Discord = require("discord.js");
const Command = require("../../base/Cmds.js");
const perpage = 10

class Queue extends Command {
    constructor(bot) {
        super(bot, {
            name:'queue',
            description: "Music Queue",
            usage: "[page-num]",
            guildOnly:true,
            level:"Server Member"
        });
    }

    async run(message, args, level) {
        const bot = this.bot
        try {
            if (!message.guild.me.voiceChannel) return message.channel.send(message.author.toString() + " :x: There is nothing playing");
            const queue = message.guild.streamData.get('queue');
            if (!queue || queue.length === 0) return message.channel.send(message.author.toString() + " :x: There is nothing playing")
            let page = parseInt(args[0]) > 0 && parseInt(args[0]) <= Math.ceil(queue.length / perpage) ? parseInt(args[0]) : 1
            let output = ""
            let count = 0
            queue.forEach(song => {
                if (count < perpage * page && count > perpage * page - (perpage + 1)) {
                    output = output + `\n${count + 1} = **${song.title} (Requested by ${song.requester.tag ? song.requester.tag : `${song.requester.username}#${song.requester.discriminator}`}) **`
                }
                count ++
            })
            return message.channel.send(output)
            this.bot.sendMessage(message, {
                title: "Music Queue",
                description: `${output}`
            }, true)
        } catch (err) {
            message.channel.send('' + err)
        }
    }

}

module.exports = Queue;