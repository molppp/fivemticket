const { ButtonStyle } = require('discord.js');
    const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
    const config = require('../config.json');

    module.exports = {
    name: 'kanalkilit',
    description: 'Belirtilen rolün kanala yazma yetkisini kapatır veya açar.',
    async execute(message, args) {
        const yetkiliRolID = config.OwnerRoleID;

        if (!message.member.roles.cache.has(yetkiliRolID)) {
        return message.reply('Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.');
        }

        const hedefRolAdi = config.WhitelitRole;

        const hedefRol = message.guild.roles.cache.find(rol => rol.id === hedefRolAdi);

        if (!hedefRol) {
          return message.reply(`"${hedefRolAdi}" adında bir rol bulunamadı.`);
        }
    
        const kapatButton = new ButtonBuilder()
          .setCustomId('kapatButton')
          .setLabel('🔒 Kapat')
          .setStyle(ButtonStyle.Danger);
    
        const acButton = new ButtonBuilder()
          .setCustomId('acButton')
          .setLabel('🔓 Aç / Sıfırla')
          .setStyle(ButtonStyle.Success);
    
        const row = new ActionRowBuilder().addComponents(kapatButton, acButton);
    
        const msg = await message.channel.send({
          content: `
\`\`\`fix
Kanala mesaj göndermeyi kapatmak veya açmak mı istiyorsun? Aşağıdaki butonları kullan.
\`\`\``,
          components: [row],
        });
    
        const filter = interaction => interaction.customId === 'kapatButton' || interaction.customId === 'acButton';
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 }); // 15 saniye boyunca bekler
    
        collector.on('collect', async interaction => {
          collector.stop(); // İlk butona tıklama sonrasında collect eventini durdur
    
          const kilitlenecekKanal = message.channel;
          let kilitDurumu = null;
    
          if (interaction.customId === 'kapatButton') {
            kilitDurumu = true;
          } else if (interaction.customId === 'acButton') {
            kilitDurumu = null;
          }
    
          // Kanalın izinlerini güncelle veya sıfırla
          await kilitlenecekKanal.permissionOverwrites.edit(hedefRol, {
            SEND_MESSAGES: kilitDurumu,
          });
    
          // Mesajı güncelle
          const durumMesaji = kilitDurumu === true ? 'Kanal Kilitlendi' : 'Kanal Tekrardan Açıldı';
          msg.edit({ content: `
\`\`\`yaml
Kanal Durumu: ${durumMesaji}
\`\`\``, components: [] });
        });
    
        collector.on('end', collected => {
          if (collected.size === 0) {
            // Zaman aşımına uğradığında
            msg.edit({ content: 'İşlem zaman aşımına uğradı.', components: [] });
          }
        });
      },
    };