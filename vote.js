const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const INTENTS = Object.entries(Discord.Intents.FLAGS).filter(([K]) => ![].includes(K)).reduce((t, [, V]) => t | V, 0) 
const client = new Discord.Client({intents: INTENTS  })  // Intents
const db = require("croxydb"); // DataBase
const {MessageActionRow, MessageButton } = require("discord.js");
client.commands = new Discord.Collection();
const express = require('express')
const app = express()
const fetch = ("node-fetch");
const fs = require("fs");
const config = require('./config.json')

client.on("ready", () => {
  console.log("Successfully connected") // Log message, editable 
})


const axios = require("axios")  
 const Topgg = require('@top-gg/sdk') // Connections

 const webhook = new Topgg.Webhook('')  // Enter the password you specified on Top.gg here.
 app.post('/dblwebhook', webhook.listener(async (vote) => { 
 console.log(`${vote.user}  Voted!`)  // Voter section 
 const user = await client.users.fetch(vote.user) 
 let u = await client.users.cache.get(vote.user) 
 axios.get(`https://top.gg/api/bots/BOTID`, {  // In the section that says BotID, enter your ID.
     headers: {"Authorization": config.topgg-auth} 
   }) 
   .then(function (response) {    
     const embed = new Discord.MessageEmbed() 
 .setColor("#0099ff") // Hex code #BLUE #RED etc.
    .setAuthor(u.username, user.displayAvatarURL({dynamic: true})) 
   .setFooter(`Your Bot Name`, client.user.avatarURL() ) 
 .setTitle("") //The message that will appear when you vote for the bot
 .setDescription(`🍥 Voter:  <@${vote.user}> (\`${user.username}#${user.discriminator}\`)  
 ⛵ Total Votes This Month: ${response.data.monthlyPoints} `)  // Shows the number of votes per month.
 const row = new MessageActionRow()  
 .addComponents( 
 new MessageButton()  
 .setStyle("LINK")   // Your bot link
 .setLabel("") // Editable vote text
 .setEmoji("") // Emoji that will appear on the button
 .setURL("https://top.gg/bot/BotID/vote") // In the section that says BotID, enter your ID.
 )  
 client.channels.cache.get('') // Specify here the ID of the channel that the message will go to
 .send({embeds: [embed], components: [row]}) 
    }) 
 }))

client.login(config.secret) // Secret token of your bot
