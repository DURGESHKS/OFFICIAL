module.exports = client => {
  const Discord = require("discord.js");
  const prefixx = client.prefix;
  let botStatus = [
    `${client.guilds.cache.size} servers!`,
    `${prefixx}help`,
    `Over ${client.users.cache.size} users!`,
    `Over ${client.channels.cache.size} channels!`
]

    setInterval(function() {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

    client.user.setUsername('OFFICIAL'); // sets the bots name
    client.user.setStatus("online"); // sets the bots status
    
  console.log(`Hello ${client.user.username} is now online!`); // consoles logs this when bot is turned on
   
};
