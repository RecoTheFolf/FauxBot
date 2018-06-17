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
const r = require('rethinkdbdash')({db:`FauxBot`})()
const rethonk = require('rethinkdbdash')()




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
    //Check DB stuff
    console.log("Database check")
    try {
    await require('rethinkdbdash')().connect().catch()
    } catch(e) {
        console.error('ERROR: Could not initialize a connection to rethinkdb')
        process.exit()
    }
   
    const dbs = await rethonk.dbList()
   if (!dbs.includes('FauxBot')) {
    console.warn('No FauxBot db detected, creating...')
    await rethonk.dbCreate('FauxBot').run()
   }

    await rethonk.db('FauxBot').table('settings').run().catch(async e => {
        console.warn("No settings table found in db \"FauxBot\"")
        await rethonk.db('FauxBot').tableCreate('settings').run()
    })

    //Run all initialization actions
    //-------------------------------
    //Load Categories
    const categoryFolders = await readdir('./commands')
    categoryFolders.forEach(async c => {
        const thisCommands = await readdir(`./commands/${c}/`)
        console.log(`Now loading ${thisCommands.length} commands in the ${c} category`)
        thisCommands.forEach(async co => {
            try {
            const cmd = new (require(`./commands/${c}/${co}`))(bot)
            cmd.conf.category = c
            if (!bot.categories.includes(c)) bot.categories.push(c);
            bot.commands.set(co.split('.')[0],cmd) 
            } catch(e) {
                console.error(`Could not load the ${co} command ${e.message}\n${e.stack}`)
            }
        })
    })

    const eventFiles = await readdir('./events')
    console.log("Loading Events...")
    eventFiles.forEach(f => {
        try {
        const eventName = f.split('.')[0]
        console.log(`Loaded the ${eventName} event`)
        const event = new (require(`./events/${f}`))(bot);
        bot.on(eventName, (...args) => event.run(...args)) 
        } catch(e) {
            console.error(`Could not load the ${eventName} event ${e.message}\n${e.stack}`)
        }
    })
    bot.login(bottoken.discordToken)
}


initialize();