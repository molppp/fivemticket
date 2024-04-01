const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'sil',
  description: 'Belirtilen miktarda mesajı siler.',
  usage: '!sil <miktar>',
  execute(message, args) {
    const yetkiliRolID = config.OwnerRoleID;
    if (!message.member.roles.cache.has(yetkiliRolID)) {
      return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
    }

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount) || amount <= 1 || amount > 100) {
      return message.reply('Lütfen 1 ile 100 arasında bir sayı belirtin.');
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.reply('Mesajları silerken bir hata oluştu.');
    });

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setDescription(`${amount - 1} mesaj silindi.`);

    message.channel.send({ embeds: [embed] }).then(sentMessage => {
      sentMessage.delete({ timeout: 5000 }); // 5 saniye sonra mesajı sil
    });
  },
};
