const config = require('../config.json');

const { Collection, EmbedBuilder } = require('discord.js');

const cooldowns = new Collection();

module.exports = {
  name: 'kayit',
  description: 'Yetkililere yardım talebi gönderir.',
  cooldown: 600, 
  execute(message, args) {
    const yetkiliRolID = config.AutoRoleID;
    const StaffRole = config.staffRoleID;
    const YetkiliMesaj = config.YetkiliMesaj;
    const allowedChannelID = config.welcomeChannel;

    if (!message.member.roles.cache.has(yetkiliRolID) || message.channel.id !== allowedChannelID) {
      return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz veya yanlış kanalda kullanıyorsunuz.`');
    }


    const { cooldown } = this;
    if (!cooldowns.has(this.name)) {
      cooldowns.set(this.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(this.name);
    const cooldownAmount = cooldown * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const minutesLeft = Math.ceil(timeLeft / 60); // Saniyeden dakikaya çevirme ve yukarıya yuvarlama
        return message.reply(`Bu komutu tekrar kullanabilmek için **${minutesLeft}** dakika beklemelisin.`);
      }
    }

    // Yardım talebi mesajını oluştur
    const talepMesaji = `${YetkiliMesaj} <@&${StaffRole}>`;
    const talepm = `\`\`\`diff
- ${YetkiliMesaj}
\`\`\`<@&${StaffRole}>`;

    // Mesajı gönder
    message.channel.send(talepm);

    // Cooldown süresini kullanıcının son kullanma tarihini güncelle
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  },
};
