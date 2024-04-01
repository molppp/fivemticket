const config = require('../config.json');

module.exports = {
    name: 'ready',
    execute(client) {
      console.log(`[ready] OK`)
      client.user.setActivity(config.BotDurum , { type: 'PLAYING' });
      
    },
  };
  