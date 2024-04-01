const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
      console.log(`[messageCreate] eventi tetiklendi.`)
      if (message.author.bot) return;
  
      if (message.content.startsWith(config.Prefix)) {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
  
        const command = message.client.commands.get(commandName);
  
        if (!command) return;
  
        try {
          command.execute(message, args);
        } catch (error) {
          console.error(error);
          message.reply('Komutu çalıştırırken bir hata oluştu.');
        }
      }
    },
  };
  