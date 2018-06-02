const randomstring = require("randomstring");
const ytdl = require('ytdl-core')

module.exports = (bot) => {
    bot.clean = async (bot, text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        if (typeof evaled !== "string")
          text = require("util").inspect(text, {depth: 0});
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(bot.tokens.discordToken, randomstring.generate(24)+"."+randomstring.generate(6)+"."+randomstring.generate(23));
        return text;
    }

    bot.awaitReply = async (msg, question, limit = 15000) => {
      const filter = m=>m.author.id === msg.author.id;
      await msg.channel.send(question);
      try {
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
      } catch (e) {
        return 'no_response';
      }
    };

    bot.resetStream = async (guild) => { //Minimize code, make function

      if (bot.streamData.get(guild.id).get('leaveReason')) {
        await bot.streamData.get(guild.id).get('displayChannel').send(bot.streamData.get(guild.id).get('leaveReason'))
      } else {
        await bot.streamData.get(guild.id).get('displayChannel').send("Queue has concluded")
      }
      //Clear
      bot.streamData.get(guild.id).set('voiceChannel','null')
      bot.streamData.get(guild.id).set('displayChannel','null')
      bot.streamData.get(guild.id).set('queue',[])
      bot.streamData.get(guild.id).delete('leaveReason')
      guild.voiceConnection ? guild.voiceConnection.channel.leave() : null
    }

    bot.play = async (guild) => {
      const queue = guild.streamData.get('queue')
      const vChannel = guild.streamData.get('voiceChannel')
      const dChannel = guild.streamData.get('displayChannel')

      if (queue.length === 0) { //End of queue
       return bot.resetStream(guild)
      }
      try {
        await vChannel.join().then(c => c.play(ytdl(queue[0].id, { audioonly: true }), { passes: 3 }));
        dChannel.send(`Now playing \`${queue[0].title}\` requested by \`${queue[0].requester.tag}\``)
        guild.voiceConnection.dispatcher.on('end', () => {//Fired when stream can't keep up or when stream ends
          queue.shift();//remove the first object in the queue (queue[0])
          bot.play(guild) //basically looping the function
          })
          guild.voiceConnection.dispatcher.on('error', (err) => {
            guild.streamData.set('leaveReason',`An error ocurred ${err}`)
          })
      } catch(e) {
        await bot.streamData.get(guild.id).set('leaveReason',`An error ocurred\n${e}`)
        bot.resetStream(guild)
      }
    }

    bot.wait = require("util").promisify(setTimeout); //For useful waiting
}