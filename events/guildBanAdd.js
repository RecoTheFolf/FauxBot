const discord = require('discord.js')

module.exports = class {
    constructor(client) {
      this.bot = client;
    }
  
    async run(guild,user) {
        return; //Will finish later
        const settings = await this.bot.settings.get(guild.id).getField('settings').run();
        const modlogs = this.bot.channels.get(settings.modlogs.value)
        if (!modlogs || !modlogs.permissionsFor(guild.me).has(['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'])) return;
        await this.bot.wait(1000) //Wait a second so that the log can be found
          if (!this.bot.awaitingbans[user.id] || !this.bot.awaitingbans[user.id].mod) {

            let audit = null
            await guild.fetchAuditLogs().then(logs => {
            audit = logs.entries.filter(m => {
            if (m.action === 'MEMBER_BAN_ADD' && m.target.id === user.id) return m;
            }).first()
      
      console.log(audit)
      
            if (audit) {
              if (audit.executor.bot) return; 
            this.bot.addLog(user, "Ban", audit.executor, audit.reason,0xff0000,guild)
          } else {
        this.bot.addLog(user, "Ban", null, null,0xff0000,guild)
        }
            })
      
       } else {
              //this.bot.addLog(user,'Ban',this.bot.awaitingbans[user.id].mod, this.bot.awaitingbans[user.id].reason, 0xff0000, guild)
              return delete this.bot.awaitingbans[user.id]
              }
    }
  };