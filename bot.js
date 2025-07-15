const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const token = process.env.token;

const bot = new TelegramBot(token, {polling : true});

bot.on('message', async(msg) => {
  const start = Date.now()
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const userId = msg.from.id;
  const userFirstName = msg.from.first_name || "Unknown";
  const userLastName = msg.from.last_name || "Unknown";
  const userName = msg.from.username || "Unknown";

  if (userMsg === "/start"){
    bot.sendMessage(chatId, `🖐 Welcome to OligoGram Bot! your friendly Telegram Bot develped by Joseph Bonsu 🇬🇭, Please follow my OligoTech Channel at https://t.me/OligoTech for more tech updates and insights.\nType /help to see what I can do.`);
  }else if(userMsg === "/help"){
    bot.sendMessage(chatId, `꧁ ✨ Available Commands ✨️ ꧂\n\n⧈⧈⧈⧈⧈⧈⧈⧈ BASIC ⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /start ⇒ Starts the bot 🤖\n◈ /help ⇒ Shows this help message 🚸\n◈ /ping ⇒ Check bot's response time 🎯\n◈ /photo ⇒ Sends a particular photo 📸\n◈ /sticker ⇒ Sends Suarez bore face sticker 🤣\n◈ /alive ⇒ Sends ping song ⏸️\n◈ /ownerPic ⇒ An iconic portrait of the bot programmer 🤯👾\n\n⧈⧈⧈⧈⧈⧈⧈⧈ CRYPTO ⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /btc ⇒ Bitcoin current price 💰\n◈ /eth ⇒ Ethereum current price 🧠\n◈ /sol ⇒ Solana current price 🔮\n◈ /bnb ⇒ Binance coin current price 🪙\n◈ /ada ⇒ Cardano current price 💢\n◈ /xrp ⇒ Ripple current price💠\n\n꧁✨️  𝑷𝒐𝒘𝒆𝒓𝒆𝒅  𝒃𝒚  𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉  ✨️꧂`);
  }else if(userMsg === "/info"){
    bot.sendMessage(chatId, `╔⫷⫸⫷⫸⫷[⚡️INFO PULSE ]⫸⫷⫸⫷⫸◆\n║\n║  ◈ /myInfo - Get your own info.\n║\n║  ◈ /botOwnerInfo - Know more about the ║ bot creator.\n║\n╠════🔗FOLLOW MY GITHUB════⧈\n║\n║ 🐱 GitHub: github.com/oligocodes👾\n║\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg === "/ping"){
    bot.sendMessage(chatId, `⏳️ Calculating ....`).then(() =>{
     end = Date.now();
     pingTime = end - start;
     bot.sendMessage(chatId, `╔⫷⫷⫷[⚡️OLIGO PULSE ]⫸⫸⫸◆\n║\n║ 💥 𖣘 PONG!\n║ ⏱️ 𖣘 Latency: ${pingTime}ms.\n║\n╠════🔗 LINK STABLE═════⧈\n║\n║ ⚙ AI CORE: ░░ SYNCED👾\n║\n╚[🥶Developer: Joseph Bonsu 🇬🇭]◆`);
})}else if(userMsg === "/myInfo"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👤 USER PROFILE ]⫸⫸⫸◆\n║\n║  ◈ First Name: ${userFirstName}\n║  ◈ Last Name: ${userLastName}\n║  ◈ Username: @${userName}\n║  ◈ User ID: ${userId}\n║\n╠════📎YOU LOOK AWESOME═══⧈\n║\n║ Hope you’re enjoying the bot! 😎\n║\n❂⊣ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ⊢❂`);
  }else if(userMsg === "/botOwnerInfo"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👑 BOT OWNER INFO ]⫸⫸⫸◆\n║\n║ ◈ Owner: OligoCodes\n║ ◈ Role: Developer & Architect 🤖\n║ ◈ Location: Ghana 🇬🇭\n║ ◈ Contact: https://t.me/OligoCodes\n║\n╠═════🌐 VISIT MY GITHUB═════⧈\n║\n║ GitHub: github.com/OligoCodes/\n║\n╠[💬 FOLLOW MY WHATSAPP CHANNEL═⧈\n║ WhatsApp: [https://whatsapp.com/channel/0029VbB6vUk1NCrRjbDzKZ3W]\n║\n❂⊣꧁ ✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ✟ ꧂ ⊢❂`);
  }else if(userMsg === "/photo"){
      const photoUrl = `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300`;
      const caption = {caption : `👾 Here is a photo 📸`};
      bot.sendPhoto(chatId, photoUrl, caption);
  }else if(userMsg === "/ownerPic"){
      const ownerPhotoDir = `./oligo.jpg`;
      const caption = {caption : `OligoCodes, bot Owner, tech Enthusiast and  Developer from Ghana 🇬🇭. ... 🌍`};
      bot.sendPhoto(chatId, ownerPhotoDir, caption);
  }else if(userMsg === "/sticker"){
     const stickerId = `CAACAgQAAxkBAhsShWh0eleZ06DjsFm13W6rCgcJGAN5AAIBAAOj9eEjc8NT0bFA_qQ2BA`;
     bot.sendSticker(chatId, stickerId);
  }else if(userMsg === "/alive"){
     const musicUrl = `./Alive.mp3`;
     const details = {caption : `I'm always alive buddy 👾👾👾`, title: `Montagem Ladrao`,performer: `OligoCodes 💠`, thumb : `./oligo.jpg`};
     bot.sendAudio(chatId, musicUrl, details);
  }else if(userMsg === "/btc"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
      const price = response.data.bitcoin.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of BITCOIN💰 is $${price} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🧠`);
      }
  }else if(userMsg === "/eth"){
    try{
      const response = await axios.get(`https://api.coingecko.com/pi/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      const ethPrice = response.data.ethereum.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of ETHEREUM 🧠  is $${ethPrice} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🧠`);
      }
  }else if(userMsg === "/sol"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`)
      const solPrice = response.data.solana.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of SOLANA 🔮  is $${solPrice} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/bnb"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`);
      const bnbPrice = response.data.binancecoin.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of BINANCE COIN 🪙 is $${bnbPrice} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💢`);
      }
  }else if(userMsg === "/ada"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`)
      const adaPrice = response.data.cardano.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of CARDANO 💢  is $${adaPrice} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/xrp"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`);
      const xrpPrice = response.data.ripple.usd;

      bot.sendMessage(chatId, `❂⊣ The current price of RIPPLE 💠  is $${xrpPrice} ⊢❂`);
      }catch(e){

      console.error(e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💠`);
      }
  }else{
      bot.sendMessage(chatId, `I don't understand that yet 😑, I am still under development by github.com/oligocodes\nAnyways try using /help for a list of commands ★ `);  }
  });
