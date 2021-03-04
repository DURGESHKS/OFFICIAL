const Timeout = new Set();
const {MessageEmbed} = require('discord.js')
const config = require('../../botconfig.json')
const ms = require('ms')
const prefix = config.prefix;

module.exports = async (bot , message) => {
	const server = message.guild;

    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);

    if (!command) command = bot.commands.get(bot.aliases.includes(cmd));


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
	      message.delete().catch(console.error);
      }
    }
    if (invalidPerms.length){
      const embedpe = new MessageEmbed()
      .setTitle(`\**${message.author.username}\**`)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(`#DB0C00`)
      .setDescription(`<a:ERROR:816671850804543509>REQUIRE PERMISSIONS: \**${invalidPerms}\** <a:NOPERMISSION:816664072858763284>`)
      .setFooter(`PERMISSION`, bot.user.displayAvatarURL())
      return message.channel.send(embedpe).then(m => {
    m.delete({ timeout: 10000 })
  });
    }
  }
    if (command) {
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)) {
		    message.delete().catch(console.error);
            	const embedtime = new MessageEmbed()
                .setColor(`#EF473C`)
                .setTitle(`\**${message.author.username}\**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`<a:ERROR:816671850804543509>You can only use this command every **${ms(command.timeout)}!** <a:COOLDOWN:816664555575967764>`)
                .setFooter(`COOLDOWN`, bot.user.displayAvatarURL())
                return message.reply(embedtime).then(m => {
                    m.delete({ timeout: 15000 })
            });
            }else{
                    message.delete().catch(console.error);
                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }else{
		message.delete().catch(console.error);
            command.run(bot,message,args)
        }

    }

 }
