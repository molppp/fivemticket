const config = require('../config.json');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'wlal',
    description: 'Belirtilen kullanıcının bütün rollerini alıp kayıtsız rolünü verir.',
    execute(message, args) {
      const yetkiliRolID = config.staffRoleID;
  
      const kayitsizRolID = config.AutoRoleID;
  
      if (!message.member.roles.cache.has(yetkiliRolID)) {
        return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
      }
  
      const targetUser = message.mentions.members.first();
  
      if (!targetUser) {
        return message.reply('`Hata: Lütfen bir kullanıcı etiketleyin.`');
      }
  
      // Kullanıcının bütün rollerini al
      targetUser.roles.set([kayitsizRolID]);
      const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(config.guildName)
      .setDescription(`__**Whitelist Manager**__
\`\`\`diff
- "${targetUser.user.tag}" isimli kullanıcının Whitelist ve üstündeki diğer rolleri aldım kayıtsız rolü verdim.
\`\`\``);
    message.channel.send({ embeds: [embed] });
      //message.reply(`${targetUser.user.tag} kullanıcısının bütün rolleri alındı, "${kayitsizRolID}" rolü verildi.`);
    },
  };
  