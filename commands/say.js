const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'say',
  description: 'Sunucudaki kullanıcı, belirtilen roldeki kullanıcı sayısı, seste bulunan kullanıcı sayısı ve boost sayısını gösterir.',
  execute(message, args) {
    const belirliRolID = config.WhitelitRole;
    const belirliRolID2 = config.AutoRoleID;

    const toplamKullaniciSayisi = message.guild.memberCount;

    const belirliRol = message.guild.roles.cache.get(belirliRolID);
    const belirliRolKullaniciSayisi = belirliRol ? belirliRol.members.size : 0;
    const belirliRol2 = message.guild.roles.cache.get(belirliRolID2);
    const belirliRolKullaniciSayisi2 = belirliRol2 ? belirliRol2.members.size : 0;


    const boostSayisi = message.guild.premiumSubscriptionCount;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(config.guildName)
      .setDescription(`__**Sunucu İstatistikleri**__
\`\`\`diff
+ Toplam Kullanıcı Sayısı: ${toplamKullaniciSayisi}
+ Whitelist Rolündeki Kullanıcı Sayısı: ${belirliRolKullaniciSayisi}
+ Takviye Sayısı: ${boostSayisi}
- Kayıtsız Rolündeki Kullanıcı Sayısı: ${belirliRolKullaniciSayisi2}
\`\`\``);

    message.channel.send({ embeds: [embed] });
  },
};
