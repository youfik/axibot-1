const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./Axiacon.json")
const nodeyourmeme = require('nodeyourmeme');
const getMemeUrls = require('get-meme-urls');
var request = require('request');
var randomCat = require('random-cat');
var querystring = require("querystring");
const { dataClasses, search } = require('hibp');
const hibp = require('hibp');
const math = require('mathjs');
const encodeUrl = require("encodeurl");
const dogPicture = require("random-puppy");
const aes = require("aes");

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.on('ready', () => {
  console.log('Connected to discord.');
  console.log('Axia');
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
    var rand = [':8ball: Absoluut.', ':8ball: Absoluut niet.', ':8ball: Het is echt zo.', ':8ball: Kan niet.', ':8ball: Natuurlijk.', ':8ball: Ik denk het niet.', ':8ball: Het is waar.', ':8ball: Het is niet waar.', ':8ball: Ik betwijfel het.', ':8ball: Ik betwijfel het ten zeerste.', ':8ball: Mijn bronnen zeggen van niet.', ':8ball: StriktGeheim zegt van wel.', ':8ball: Ik ben in de war. Probeer het opnieuw.', ':8ball: Daar ga ik nu geen antwoord op geven.', ':8ball: Dat wil je niet weten.', ':8ball: Ik weet het niet zeker.', ':8ball: Concentreer je, en vraag het opnieuw.'];

    return rand[Math.floor(Math.random()*rand.length)];
}

function tossThisCoin() {
    var rand = ['Je gooide een muntje. Het is kop.', 'Je gooide een muntje. Het is munt.'];
    return rand[Math.floor(Math.random()*rand.length)];
}

bot.on('message', msg => {
	if ( !msg.guild.id ) {
	return;
	}
	else {
		let substr = "@Axia College#5796";
		if (msg.isMentioned(bot.user)) {
			msg.reply("hai. Ik ben de Axia Bot. Gebruik !help voor een lijst met mijn commando's.");
		}
			else {
			return;
		}
	}
});

bot.on('message', async msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;
  if ( !msg.guild.id ) {
	return;
  }
  let command = msg.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  console.log('Iemand voerde ' + command + ' in de axia server. Voor verificatie is hier het Guild ID: ' + msg.guild.id + '.');

  let args = msg.content.split(" ").slice(1);
  if (command === "author") {
	  msg.channel.send("Hallo! Mijn naam is Youri, en ik ben een leerling op het Axia College. Ik programmeer veel in mijn vrije tijd, en maak (zoals je ziet) ook discord bots in Node.JS (een programmeertaal). Ik heb deze bot ooit ontwikkeld als public bot, onder de naam Lizard. Maar nu gebruik ik de code nergens voor, dus maakte ik er maar deze Axia bot van.");
}

  else if (command === "ping") {
    msg.channel.send("Pong! (even geduld, latency...)").then(m => m.edit(`Pong! (Latency is ${m.createdTimestamp - msg.createdTimestamp}ms, en API latency is ${Math.round(bot.ping)}ms)`) );
  }

  else if (command === "pong") {
     msg.channel.send("Ping! (even geduld, latency...)").then(m => m.edit(`Ping! (Latency is ${m.createdTimestamp - msg.createdTimestamp}ms, en API latency is ${Math.round(bot.ping)}ms)`) );

  }

  else if (command === "avatar") {
	var otherAvatarMention = msg.mentions.users.first();
	let substr = "@";
	if(msg.content.indexOf(substr) > -1) {
		msg.reply("mention een gebruiker op deze server.");
	}
	else if ( !otherAvatarMention )
	{
		msg.reply(msg.author.avatarURL);
	}
	else {
		msg.reply(otherAvatarMention.avatarURL);
	}
  }
  else if (command === "8ball") {
    msg.channel.send(doMagic8BallVoodoo())
  }

  else if (command === "toss") {
    msg.channel.send(tossThisCoin())
  }
  
  else if(command === "kick") {
    if(!msg.member.roles.some(r=>["Beheerders"].includes(r.name)) )
      return msg.reply("leuke poging. Alleen Beheerders mogen dit.");
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if(!member)
      return msg.reply("mention een gebruiker op deze server.");
    if(!member.kickable) 
      return msg.reply("Ik kan deze gebruiker niet kicken, ze hebben misschien hogere permissies dan de Axia bot. Ik kan alleen Leerlingen kicken.");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Je bent verbannen.";
    member.kick(reason)
      .catch(error => msg.reply(`sorry ${msg.author}. Ik krijg deze error : ${error}. Meld dit anders even bij Youri`));
    msg.reply(`${member.user.tag} is gekicked door ${msg.author.tag}. Reden: ${reason}`);

  }
  
  else if(command === "ban") {
    if(!msg.member.roles.some(r=>["Beheerders"].includes(r.name)) )
      return msg.reply("leuke poging. Alleen Beheerders mogen dit.");
    
    let member = msg.mentions.members.first();
    if(!member)
      return msg.reply("mention een gebruiker op deze server.");
    if(!member.bannable) 
      return msg.reply("Ik kan deze gebruiker niet bannen, ze hebben misschien hogere permissies dan de Axia bot. Ik kan alleen Leerlingen bannen.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    member.ban(reason)
      .catch(error => msg.reply(`sorry ${msg.author}. Ik krijg deze error : ${error}. Meld dit anders even bij Youri`));
    msg.reply(`${member.user.tag} is gebanned door ${msg.author.tag}. Reden: ${reason}`);
  }
  
  else if(command === "clear") {
    if(!msg.member.roles.some(r=>["Beheerders"].includes(r.name)) )
      return msg.reply("leuke poging. Alleen Beheerders mogen dit.");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return msg.reply("geef een nummer van 2 tot en met 100 op als hoeveelheid.");
    const fetched = await msg.channel.fetchMessages({limit: deleteCount});
    msg.channel.bulkDelete(fetched)
      .catch(error => msg.reply(`sorry ${msg.author}. Ik krijg deze error : ${error}. Meld dit anders even bij Youri`));
  }
  
  else if (command === "meme") {
	if ( typeof args[0] !== 'undefined' && args[0] )
		getMemeUrls(args[0]).then(result => {
			var response = result[ Math.random() * result.length |0 ];
			msg.channel.send(response + "\n*Met dank aan memegenerator.com*");
  })
	else
		getMemeUrls('discord').then(result => {
			var response = result[ Math.random() * result.length |0 ];
			msg.channel.send(response + "\n*Met dank aan memegenerator.com*");
  })
}

  else if (command === "kat") {
	var url = randomCat.get({
	category: 'cats'
	});
	msg.channel.send(url + "\n*Met dank aan lorempixel.com*");
  }

  else if (command === "voedsel") {
	var foodUrl = randomCat.get({
	category: 'food'
});
	msg.channel.send(foodUrl + "\n*Met dank aan lorempixel.com*");
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
      .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : '*Geen nickname*'}`, true)
      .addField("Account gemaakt:", `${user.createdAt}`)
      .addField("Server gejoined:", `${member.joinedAt}`)
      .addBlankField(true)
      .addField("Status:", `${user.presence.game ? user.presence.game.name : '*Geen presence*'}`, true)
      .addField("Rollen:", member.roles.map(roles => `${roles.name}`).join(', '), true)
    msg.channel.send({embed});
  }
  
  else if (command === "nick") {
	if ( !args[0] ) {
		return msg.reply("mention een gebruiker op deze server.");
	}
	else if (msg.member.roles.some(r=>["Beheerders"].includes(r.name)) ) {
		var userID = args[0].replace('<@', '').replace('>', '').replace('!', '');
		var newNick = args[1];
		msg.guild.members.get(userID).setNickname(newNick, "nick command executed");
		msg.reply("prima. De nickname van de gebruiker is nu " + args[1] + ".");
  }
	else if (!msg.member.roles.some(r=>["*"].includes(r.name)) ) {
      return msg.reply("leuke poging. Alleen Beheerders mogen dit.");
	}
  }
  
  else if (command === "random") {
	if ( args[0] ) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	msg.reply((getRandomInt(args[0])) + " is je willekeurige getal.")
	}
	else {
		msg.reply("geef een maximum op om een willekeurig getal te picken.");
	}
  }
  
  else if (command === "hibp") {
	search(args[0])
		.then(data => {
			if (data.breaches || data.pastes) {
				msg.reply("oei, de HIBP database geeft datalekken aan voor " + args[0] + "! Ga naar **https://www.haveibeenpwned.com** en check je emailadres daar voor meer informatie!");
			} else {
				msg.channel.send('Goed bezig! Geen datalekken gevonden voor ' + args[0] + '.');
			}
		})
		.catch(err => {
			console.log(err.message);
		});
  }

  else if (command === "hond") {
    dogPicture()
      .then(directLink => {
        let embed = new Discord.RichEmbed()

        .setAuthor("Axia")
        .setTitle("Hond")
        .setThumbnail(directLink)

        msg.channel.send({embed});

        })
  }

	else if (command === "") {
	msg.reply("dit commando bestaat niet. Probeer !help.");
  
  }
  else if (command === "help") {
    let embed = new Discord.RichEmbed()
      .setAuthor("Axia")
      .setTitle("Commando's:")
      .setDescription("!help | Deze embed \n!clear | Verwijder een groot aantal berichten \n!hibp (email adres) | Check of je voorkomt in datalekken \n!ping | Krijg de ping van de bot \n!nick (gebruiker) (nickname) | Verander een nickname \n!pong | Krijg de ping van de bot \n!random (max) | Krijg een willekeurig nummer onder (max) \n!author | Wie heeft mij gemaakt? \n!avatar | Krijg jouw eigen (of andermans) avatar \n!8ball | Voodoo \n\n!toss | Gooi een muntje \n!kick | Kick een Leerling \n!ban | Ban een Leerling\n!meme (zoekterm) | Zoek voor memes met (zoekterm)\n!kat | Kattenplaatjes!\n!voedsel | Het beste eten wat er is\n!userinfo (optioneel: @naam#1234)| Verkrijg jouw (of andermans) userinfo\n!hond | Hondenplaatjes!")
      .setColor(3604192)
      .setTimestamp()
      .setFooter("© (Copyright) Youri Kuilman 2018");
	  
	  msg.channel.send({embed});
  }
  else {
	  msg.reply("dit commando bestaat niet. Probeer !help.");
  }

});

bot.login(config.token);