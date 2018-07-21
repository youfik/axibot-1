const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./lizardcon.json")
const nodeyourmeme = require('nodeyourmeme');
const getMemeUrls = require('get-meme-urls');
var request = require('request');
var randomCat = require('random-cat');

bot.on('ready', () => {
  console.log('Connected to discord.');
  console.log('Lizard');
  console.log('Made by Etern4lSec // Youri');
});

bot.on('ready', () => {
    bot.user.setPresence({
        game: {
            name: config.prefix + "help",
            type: "PLAYING",
        }
    });
});



function doMagic8BallVoodoo() {
    var rand = [':8ball: Absolutly.', ':8ball: Absolutly not.', ':8ball: It is true.', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];

    return rand[Math.floor(Math.random()*rand.length)];
}

function tossThisCoin() {
    var rand = ['You tossed a coin, it lands on heads.', 'You tossed a coin, it lands on tails.'];
    return rand[Math.floor(Math.random()*rand.length)];
}

bot.on('message', async msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;
  if ( !msg.guild.id ) {
	return;
  }
  let command = msg.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  console.log('The ' + command + ' command has been used in the server with ID ' + msg.guild.id + '.');

  let args = msg.content.split(" ").slice(1);
  if (command === "author") {
	  //msg.channel.send("The Lizard bot is made by Etern4lSec, also known as JustEtern4l. His real name is Youri Kuilman. Youri is a 14 year old developer from The Netherlands. Besides programming, he also writes articles on **https://www.yourikuilman.nl**. You can follow him on Twitter too: `@JustEtern4l`.")
	  msg.channel.send("The Lizard bot is made by Etern4lSec, also known as JustEtern4l. His real name is Youri Kuilman. Youri is a 14 year old developer from The Netherlands. He would love to hear your feedback, so (if you have any) contact `Etern4lSec#7923`.")
}

  else if (command === "ping") {
    msg.channel.send("Pong! (waiting for response...)").then(m => m.edit(`Pong! (Current latency is ${m.createdTimestamp - msg.createdTimestamp}ms, while the API Latency is ${Math.round(bot.ping)}ms)`) );
  }

  else if (command === "pong") {
     msg.channel.send("Ping! (waiting for response...)").then(m => m.edit(`Ping! (Current latency is ${m.createdTimestamp - msg.createdTimestamp}ms, while the API Latency is ${Math.round(bot.ping)}ms)`) );

  }

  else if (command === "avatar") {
	var otherAvatarMention = msg.mentions.users.first();
	let substr = "@";
	if ( typeof otherAvatarMention !== 'undefined' && otherAvatarMention )
	{
		msg.reply(otherAvatarMention.avatarURL);
	}
	else if(msg.content.indexOf(substr) > -1) {
		msg.reply("mention a valid user.");
	}
	else if ( otherAvatarMention )
	{
		msg.reply(msg.author.avatarURL);
	}
  }
  else if (command === "8ball") {
    msg.channel.send(doMagic8BallVoodoo())
  }

  else if (command === "invite") {
    msg.reply("I've sent you a DM with the invite link for Lizard.")
    msg.author.send("The invite link for the Lizard bot is: **https://bit.ly/2JE4bfU**")
  }

  else if (command === "toss") {
    msg.channel.send(tossThisCoin())
  }
  
  else if(command === "kick") {
    if(!msg.member.roles.some(r=>["Moderator", "Helper"].includes(r.name)) )
      return msg.reply("Sorry, you don't have permissions to use this!");
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if(!member)
      return msg.reply("Please mention a valid member of this server.");
    if(!member.kickable) 
      return msg.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    member.kick(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't kick because of : ${error}`));
    msg.reply(`${member.user.tag} has been kicked by ${msg.author.tag} because: ${reason}`);

  }
  
  else if(command === "ban") {
    if(!msg.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return msg.reply("Sorry, you don't have permissions to use this!");
    
    let member = msg.mentions.members.first();
    if(!member)
      return msg.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return msg.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    member.ban(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't ban because the following error occured: ${error}`));
    msg.reply(`${member.user.tag} has been banned by ${msg.author.tag} for: ${reason}`);
  }
  
  else if(command === "clear") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return msg.reply("Please provide a number between 2 and 100 as the amount of messages to delete.");
    const fetched = await msg.channel.fetchMessages({limit: deleteCount});
    msg.channel.bulkDelete(fetched)
      .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`));
  }
  
  else if (command === "meme") {
	if ( typeof args[0] !== 'undefined' && args[0] )
		getMemeUrls(args[0]).then(result => {
			var response = result[ Math.random() * result.length |0 ];
			let embed = new Discord.RichEmbed()
			.setImage(response)
			.setColor("#36393E")
			.setFooter("Made possible by memegenerator.com");
			
			msg.channel.send({embed})
  })
	else
		getMemeUrls('discord').then(result => {
			var response = result[ Math.random() * result.length |0 ];
			let embed = new Discord.RichEmbed()
			.setImage(response)
			.setColor("#36393E")
			.setFooter("Made possible by memegenerator.com");
			
			msg.channel.send({embed})
  })
}

  else if (command === "cat") {
	var url = randomCat.get({
	category: 'cats'
	});
    msg.channel.send(url);
  }

  else if (command === "food") {
	var foodUrl = randomCat.get({
	category: 'food'
});
	msg.channel.send(foodUrl);
  }
  
  else if(command === "userinfo") {
    let user;
  
      if (msg.mentions.users.first()) {
        user = msg.mentions.users.first();
    } else {
          user = msg.author;
    }
    const member = msg.guild.member(user);
    const embed = new Discord.RichEmbed()
      .setColor('#36393E')
      .setThumbnail(user.avatarURL)
      .setTitle(`${user.username} | #${user.discriminator}`)
      .addField("User ID:", `${user.id}`, true)
      .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'Nothing'}`, true)
      .addField("Account made on:", `${user.createdAt}`)
      .addField("Joined server:", `${member.joinedAt}`)
      .addBlankField(true)
      .addField("Presence:", `${user.presence.game ? user.presence.game.name : 'Nothing'}`, true)
      .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
    msg.channel.send({embed});
  }

  else if (command === "help") {
    let embed = new Discord.RichEmbed()
      .setAuthor("Lizard", "https://cdn.discordapp.com/avatars/469771164521201665/6d3f9681b6e94e961b61b076a5f3b989.png?size=2048", "https://www.twitter.com/JustEtern4l")
      .setTitle("Commands:")
      .setDescription(">help | Show this list \n>clear | Delete a given amount of chat messages \n>ping | Calculate the latency \n>pong | Calculate the latency \n>author | Show information about my engineer \n>avatar | Recieve your own (or someone else's) discord avatar \n>8ball | Call in the voodoo gods \n>invite | Recieve my invite link in DM \n>toss | Toss a coin \n>kick | Kick a member from the server \n>ban | Ban a member from the server\n>meme (subject) | Sends a meme about the given subject\n>cat | Sends a random cat picture\n>food | The best food pictures the world has ever seen\n>userinfo (optional: @name#1234)| Get a userinfo tab about yourself or a mentioned user")
      .setColor(3604192)
      .addField("Changelog", "+ Added >userinfo\n* Fixed 19 buggs")
      .addField("Provide feedback:", "Because i'm always being updated, my engineer would love to hear your feedback. Send a DM on Discord to `Etern4lSec#7923` to provide him with feedback & suggestions.")
      .addField("In the next update:", "The next update will be a buggpatch\nNext version: V1.0.5")
      .setTimestamp()
      .setFooter("© Etern4lSec // JustEtern4l // Youri Kuilman 2018");
	  
	  msg.channel.send({embed})
  }
  else {
	  msg.channel.send("This command couldn't be found. Use `>help` for a list of commands.");
  }

});

bot.login(config.token);