const config = require('../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'wlver',
    description: 'Belirtilen kullanıcıya belirli bir rolü verir.',
    execute(message, args) {
      const yetkiliRolID = config.staffRoleID;
  
      const verilecekRolID = config.WhitelitRole;
  
      if (!message.member.roles.cache.has(yetkiliRolID)) {
        return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
      }
  
      const targetUser = message.mentions.members.first();
  
      if (!targetUser) {
        return message.reply('`Hata: Lütfen bir kullanıcı etiketleyin.`');
      }
  
      targetUser.roles.set([verilecekRolID]);
      const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(config.guildName)
      .setDescription(`__**Whitelist Manager**__
\`\`\`diff
+ "${targetUser.user.tag}" isimli kullanıcına başarıyla Whitelist rolü verildi.
\`\`\``);
    message.channel.send({ embeds: [embed] });
    },
  };
  