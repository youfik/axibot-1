const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
}
  if (msg.content.startsWith("ban")) {
  var tagpersoon = msg.members.get(args[0]);
  member.ban(7)
  .then(() => console.log(`Banned ${member.displayName}`))
  .catch(console.error);
};

client.login('token');