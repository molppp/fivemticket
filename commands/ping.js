const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  execute(message, args) {
    message.channel.send('Değerler ölçülüyor...').then(sentMessage => {
    const apiPing = message.client.ws.ping;
    const botPing = sentMessage.createdTimestamp - message.createdTimestamp;
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Ping Pong!')
      .setDescription(`__**Botun Ping Değeri**__
\`\`\`yaml
API Gecikmesi: ${apiPing}
Mesaj Gecikmesi: ${botPing}
\`\`\``);
    sentMessage.delete();
    message.channel.send({ embeds: [embed] });
  });
},
};