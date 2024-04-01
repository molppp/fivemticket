const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'aktif',
  description: 'Botun pingini gösterir.',
  execute(message, args) {
    const yetkiliRolID = config.OwnerRoleID;
    if (!message.member.roles.cache.has(yetkiliRolID)) {
      return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
    }
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(config.guildName)
      .setDescription(`__**Sunucu Aktif**__
\`\`\`yaml
Sunucu IP: ${config.SunucuIP}

Sunucu TS: ${config.SunucuTS}
\`\`\``)
      .setImage(config.aktifPhoto);
    message.channel.send({ embeds: [embed] });
    message.channel.send('@everyone');
  },
};