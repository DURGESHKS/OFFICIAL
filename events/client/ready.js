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

  const express = require("express");
  const app = express();
  const http = require("http");
  const config = require("./../../botconfig.json");
  const port = config.PORT;
  const replnamet = config.REPLNAME;
  const replname = replnamet.toUpperCase();
  const usernamet = config.USERNAME;
  const username = usernamet.toLowerCase();
  app.get('/', (req, res) => res.send(`Hello ${client.user.username} is now online!`));

  app.listen(port, () => console.log(`  Hello ${client.user.username} is now online!            port: ${port}
  Link: http://${replname}.${username}.repl.co`));
  setInterval(() => {
  http.get(`http://${replname}.${username}.repl.co/`);
}, 210000);   

};