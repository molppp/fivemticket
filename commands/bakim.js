const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "bakım",
  description: "Botun pingini gösterir.",
  execute(message, args) {
    const yetkiliRolID = config.OwnerRoleID;
    if (!message.member.roles.cache.has(yetkiliRolID)) {
      return message.reply(
        "`Hata: Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`"
      );
    }
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(config.guildName)
      .setDescription(
        `__**Sunucu Bakımda**__
\`\`\`diff
- Sunucu bakım moduna geçiyor, lütfen güvenli bir şekilde sunucudan çıkış yapalım.
\`\`\``
      )
      .setImage(config.bakimPhoto);
    message.channel.send({ embeds: [embed] });
    message.channel.send("@everyone");
  },
};
