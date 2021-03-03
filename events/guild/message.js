const Timeout = new Set();
const {MessageEmbed} = require('discord.js')
const config = require('../../botconfig.json')
const ms = require('ms')
const prefix = config.prefix;
const sademoji = config.SADEMOJI;
const angryemoji = config.ANGRYEMOJI;
const danceemoji = config.DANCEEMOJI;
const erroremoji = config.ERROR;
const tickemoji = config.TICKS;
const tickemoji = config.ARROW;

module.exports = async (bot , message) => {
	const server = message.guild;
	const WORDBAD = new MessageEmbed()
        .setColor(`#13FF7E`)
        .setTitle(`\**${message.author.username}\**`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`${erroremoji}You were trying to Abuse in \**${server.name}\ SERVER!** ${angryemoji}`)
        .setFooter(`BANWORD`, bot.user.displayAvatarURL())
     
        const NSL = new MessageEmbed()
        .setColor(`#13FF7E`)
        .setTitle(`\**${message.author.username}\**`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`You were trying to Send Link in \**${server.name}\ SERVER!**`, angryemoji)
        .setFooter(`NOLINK`, bot.user.displayAvatarURL())

     if (await message.content.startsWith(nolink)) {
         message.delete()
         return message.author.send(NSL)
     }
     
     if (await message.content.startsWith(badword)) {
         message.delete()
         return message.author.send(WORDBAD)
     }
     
     if (await message.content.endsWith(lastwordlink)) {
         message.delete()
         return message.author.send(NSL)
     }
     


    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift()
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    
    if (await message.content.startsWith(prefix + command.aliases)) {

        message.delete()

    }
    if (await message.content.startsWith(prefix + command.name)) {

        message.delete()

    }
    
    const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ]

  if(command.permissions.length){
    let invalidPerms = []
    for(const perm of command.permissions){
      if(!validPermissions.includes(perm)){
        return console.log(`Invalid Permissions ${perm}`);
      }
      if(!message.member.hasPermission(perm)){
        invalidPerms.push(perm);
      }
    }
    if (invalidPerms.length){
      const embedpe = new MessageEmbed()
      .setTitle(`\**${message.author.username}\**`)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(`#DB0C00`)
      .setDescription(`REQUIRE PERMISSIONS: \**${invalidPerms}\**`, sademoji)
      .setFooter(`PERMISSION`, bot.user.displayAvatarURL())
      return message.channel.send(embedpe).then(m => {
    m.delete({ timeout: 10000 })
  });
    }
  }
    if (command) {
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)) {
            	const embedtime = new MessageEmbed()
                .setColor(`#EF473C`)
                .setTitle(`\**${message.author.username}\**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`You can only use this command every **${ms(command.timeout)}!**`, danceemoji)
                .setFooter(`COOLDOWN`, bot.user.displayAvatarURL())
                return message.reply(embedtime).then(m => {
                    m.delete({ timeout: 15000 })
            });
            }else{
                
                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }else{
            command.run(bot,message,args)
        }

    }
 
}
