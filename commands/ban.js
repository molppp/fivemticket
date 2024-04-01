const { Permissions } = require('discord.js');
const config = require("../config.json");

module.exports = {
  name: 'ban',
  description: 'Belirtilen kullanıcıyı sunucudan yasaklar.',
  usage: '<@kullanıcı>',
  execute(message, args) {
    const yetkiliRolID = config.staffRoleID;
    if (!message.member.roles.cache.has(yetkiliRolID)) {
      return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
    }

    if (args.length !== 1) {
      return message.reply('Lütfen yasaklanacak kullanıcıyı etiketleyin.');
    }

    const targetUser = message.mentions.members.first();

    if (!targetUser) {
      return message.reply('Belirtilen kullanıcı bulunamadı.');
    }

    targetUser.ban()
      .then(() => {
        message.reply(`${targetUser.user.tag} başarıyla yasaklandı.`);
      })
      .catch(error => {
        console.error(error);
        message.reply('Bir hata oluştu ve kullanıcı yasaklanamadı.');
      });
  },
};
