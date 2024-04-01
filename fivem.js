const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const token = config.token;
const Intents = GatewayIntentBits;
const allIntents = [
    Intents.Guilds,
    Intents.GuildMessages,
    Intents.GuildMembers,
    Intents.GuildPresences,
    Intents.GuildVoiceStates,
    Intents.GuildBans,
    Intents.GuildInvites,
    Intents.GuildWebhooks,
    Intents.GuildScheduledEvents,
    Intents.GuildMessageReactions,
    Intents.DirectMessages,
    Intents.DirectMessageTyping,
    Intents.DirectMessageReactions,
    Intents.GuildMessageTyping,
    Intents.MessageContent
]

const client = new Client({
    intents: allIntents
});


client.commands = new Collection();

const loadEvents = (dir) => {
  const eventFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(path.join(__dirname, dir, file));
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => event.execute(...args, client));
  }
};

const loadCommands = (dir) => {
  const commandFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, dir, file));
    client.commands.set(command.name, command);
  }
};

loadCommands('commands');
loadEvents('events');
client.login(token);
