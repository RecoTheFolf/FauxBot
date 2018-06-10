//Setup
process.title = 'FauxBot'
var Config
try {
    Config = require('./settings.js')
  } catch (e) {
    console.log('\nFauxBot encountered an error while trying to load the config file, please resolve this issue and restart the bot\n\n' + e.message)
    process.exit()
  }

  

//load constants
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir)
const bottoken = require("./token.js");
const Discord = require("discord.js");
const r = require('rethinkdbdash')({db:`FauxBot`})();


function kill() {
    process.exit()
}
async function check() {
    const OS = await require('os').type()
    if (OS === 'Windows_NT') {
        console.log("Windows OS detected")
        const files = await readdir('./')
        console.log(files)
        console.log(!files.includes('rethinkdb.exe'))
        if (!files.includes('rethinkdb.exe')) { //...Can't get it to kill the process
        
    console.log('rethinkdb.exe was not found.  Please place rethinkdb in the root folder of the bot and try loading again')
    process.exit()
        }
            await require('child_process').exec('rethinkdb.exe')
    }
}
const checkStatus = check()

console.log(checkStatus)



class Faux extends Discord.Client {
    constructor(options) {
super({fetchAllMembers:true,disableEveryone:true}); //Cache users so that there's no errors when members are mentioned + Disable @everyone
        this.commands = new Discord.Collection();
        this.streamData = new Discord.Collection();
        this.botconfig = require("./settings.js");
        this.prefixes= require('./prefixes.js');
        this.events = new Discord.Collection();
        this.settings = r.table('settings');
        this.config = require('./settings.js');
        this.tokens = require('./token.js');
        this.categories = []
    }//Close constructor
}//Close class

const bot = new Faux(); //Boot


const fs = require("fs");
require("./functions.js")(bot);//Load useful functions into client/bot for easy grabbing

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };


  const initialize = async () => {
    //Run all initialization actions
    //-------------------------------
    //Load Categories
    const categoryFolders = await readdir('./commands')
    categoryFolders.forEach(async c => {
        const thisCommands = await readdir(`./commands/${c}/`)
        console.log(`Now loading ${thisCommands.length} commands in the ${c} category`)
        thisCommands.forEach(async co => {
            const cmd = new (require(`./commands/${c}/${co}`))(bot)
            cmd.conf.category = c
            if (!bot.categories.includes(c)) bot.categories.push(c);
            bot.commands.set(co.split('.')[0],cmd)
        })
    })

    const eventFiles = await readdir('./events')
    console.log("Loading Events...")
    eventFiles.forEach(f => {
        const eventName = f.split('.')[0]
        console.log(`Loaded the ${eventName} event`)
        const event = new (require(`./events/${f}`))(bot);
        bot.on(eventName, (...args) => event.run(...args))
    })
    bot.login(bottoken.devToken)
}


initialize();