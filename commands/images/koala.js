const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "koala",
    category: "images",
    permissions: ["SEND_MESSAGES"],
    aliases: ["Fox", "f", "F"],
    timeout: 60000,
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/koala";
        const facts = "https://some-random-api.ml/facts/koala"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            const errorembed = new MessageEmbed()

            .setTitle(`\**${message.author.username}\**`)

            .setColor(`#000206`)

            .setThumbnail(message.author.displayAvatarURL())

            .setDescription(`An error occured, please try again!`)

            return message.channel.send(errorembed).then(m => {

m.delete({ timeout: 20000 })

  });
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Koala Image and Fact`)
            .setColor(`#f3f3f3`)
            .setDescription(fact.fact)
            .setImage(image.link)

        await message.channel.send(embed).then(m => {

m.delete({ timeout: 60000 })

  });
    }
}
