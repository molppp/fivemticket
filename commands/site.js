const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'ip',
  description: 'Botun pingini gösterir.',
  execute(message, args) {

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(config.guildName)
      .setDescription(`__**Bot Bağlantıları**__
\`\`\`yaml
Sunucu IP: ${config.SunucuIP}

Sunucu TS: ${config.SunucuTS}
\`\`\``);
    message.channel.send({ embeds: [embed] });
  },
};