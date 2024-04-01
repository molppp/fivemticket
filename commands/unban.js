const { Permissions } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'unban',
  description: 'Belirtilen kullanıcının yasağını kaldırır.',
  usage: '<userID>',
  execute(message, args) {
    const yetkiliRolID = config.staffRoleID;
    if (!message.member.roles.cache.has(yetkiliRolID)) {
      return message.reply('`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`');
    }

    if (args.length !== 1) {
      return message.reply('Lütfen yasağı kaldırılacak kullanıcının ID\'sini girin.');
    }

    const targetUserID = args[0];

    message.guild.members.unban(targetUserID)
      .then(() => {
        message.reply(`${targetUserID} ID'li kullanıcının yasağı başarıyla kaldırıldı.`);
      })
      .catch(error => {
        console.error(error);
        message.reply('Bir hata oluştu ve kullanıcının yasağı kaldırılamadı.');
      });
  },
};
