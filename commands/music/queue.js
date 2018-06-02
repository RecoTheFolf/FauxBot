const Discord = require("discord.js");
const Command = require('../../base/Cmds.js');

class Queue extends Command {
  constructor(bot) {
      super(bot,{ 
          name:'queue',
          description: "Music Queue",
          usage: "queue",
      })
  }

async run(message, args, level) {
const queue = message.guild.streamData.get('queue')
if (queue.length === 0) return [0,"Nothing is currently in the queue"]

message.channel.send(`Queue:\n${queue.map(q => `\`${q.title}\` | Requested by \`${q.requester.tag}\``).join('\n')}`)


}
}

module.exports = Queue;