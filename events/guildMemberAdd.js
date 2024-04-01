const config = require('../config.json');

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    console.log(`[guildMemberAdd] eventi tetiklendi.`);
    const guildID = config.guildID; // Sunucu (guild) ID'si
    const channelID = config.welcomeChannel; // Kanal ID'si
    const welcomeMessage = `**${config.guildName}** sunucumuza hoşgeldin ${member.toString()}!\n\nEğlenceli ve kaliteli vakit geçirmek istiyorsan hemen sunucumuza kayıt ol!\n\nYetkilileri **!kayit** komutu ile çağırabilirsin.
    \`\`\`diff
- Sunucumuzdaki kuralları dikkate alarak işlem yap, aksi taktirde ceza-i işlem uygulanır.
\`\`\``; // Hoş geldin mesajı
    const roleID = config.AutoRoleID; // Verilecek rol ID'si

    const guild = member.client.guilds.cache.get(guildID);
    const welcomeChannel = guild.channels.cache.get(channelID);

    if (welcomeChannel) {
      welcomeChannel.send(welcomeMessage);

      const role = guild.roles.cache.get(roleID);
      if (role) {
        member.roles.add(role);
        console.log(
          `[${member.user.tag}] kullanıcısına "${role.name}" rolü verildi.`
        );
      } else {
        console.error(`Belirtilen ID'ye sahip bir rol bulunamadı: ${roleID}`);
      }
    } else {
      console.error(
        `Belirtilen ID'ye sahip bir kanal bulunamadı: ${channelID}`
      );
    }
  },
};
