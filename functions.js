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

    bot.resetStream = async (guild,reason) => { //Minimize code, make function

      if (reason) {
        await bot.streamData.get(guild.id).get('displayChannel').send(reason)
      } else {
        await bot.streamData.get(guild.id).get('displayChannel').send("No end reason provided")
      }
      //Clear
      bot.streamData.get(guild.id).set('voiceChannel','null')
      bot.streamData.get(guild.id).set('displayChannel','null')
      bot.streamData.get(guild.id).set('queue',[])
      guild.voiceConnection ? guild.voiceConnection.channel.leave() : null
    }

    bot.play = async (guild) => {
      const queue = guild.streamData.get('queue')
      const vChannel = guild.streamData.get('voiceChannel')
      const dChannel = guild.streamData.get('displayChannel')

      if (queue.length === 0) return bot.resetStream(guild,"The queue has concluded")
      

      if (vChannel.members.size === 1) return bot.resetStream(guild,"There are no members in this voice channel.  Queue has been cleared")

      try {
        console.log(queue[0])
        await vChannel.join().then(c => c.play(ytdl(queue[0].id, { audioonly: true }), { passes: 3 }));
        await vChannel.connection.dispatcher.setVolume(guild.streamData.get('volume'));
        dChannel.send(`Now playing \`${queue[0].title}\` requested by \`${queue[0].requester.tag}\``)
        guild.voiceConnection.dispatcher.on('end', () => {//Fired when stream can't keep up or when stream ends
          queue.shift();//remove the first object in the queue (queue[0])
          bot.play(guild) //basically looping the function
          })
          guild.voiceConnection.dispatcher.on('error', (err) => {
          })
      } catch(e) {
       
        bot.resetStream(guild,`An error ocurred\n${e}\n${e.stack}`)
      }
    }

    bot.wait = require("util").promisify(setTimeout); //For useful waiting
}