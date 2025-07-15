const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const ytSearch = require('yt-search');
require('dotenv').config();

const token = process.env.token;

const bot = new TelegramBot(token, {polling : true});

bot.on('message', async(msg) => {
  const start = Date.now()
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const userId = msg.from.id;
  const chatType = msg.chat.type;
  const userFirstName = msg.from.first_name || "Unknown";
  const userLastName = msg.from.last_name || "Unknown";
  const userName = msg.from.username || "Unknown";

  if (!userMsg || (chatType === 'channel')) return; 
  if (userMsg === "/start"){
    bot.sendMessage(chatId, `🖐 Welcome to OligoGram Bot! your friendly Telegram Bot develped by Joseph Bonsu 🇬🇭, Please follow my OligoTech Channel at https://t.me/OligoTech for more tech updates and insights.\nType /help to see what I can do.`);
  }else if(userMsg === "/help"){
    bot.sendMessage(chatId, `꧁ ✨ Available Commands ✨️ ꧂\n\n⧈⧈⧈⧈⧈⧈⧈⧈ BASIC ⧈⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /info ⇒ User info and botOwner info 👤 \n◈ /start ⇒ Starts the bot 🤖\n◈ /help ⇒ Shows this help message 🚸\n◈ /ping ⇒ Check bot's response time 🎯\n◈ /photo ⇒ Sends a particular photo 📸\n◈ /sticker ⇒ Sends Suarez  sticker 🤣\n◈ /alive ⇒ Sends ping song ⏸️\n◈ /ownerPic ⇒ An iconic portrait of the bot programmer 🤯👾\n\n⧈⧈⧈⧈⧈⧈⧈⧈⧈ DATA ⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈/img - Displays a random image 🖼\n◈ /crypto - Decent list of crypto prices 💰\n◈ /weather ⇒ Weather in your city ☁️\n◈ /play ⇒ Play a song from title \n\n꧁✨️  𝑷𝒐𝒘𝒆𝒓𝒆𝒅  𝒃𝒚  𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉  ✨️꧂`);
  }else if(userMsg === "/info"){
    bot.sendMessage(chatId, `╔⫷⫸⫷⫸⫷[⚡️INFO PULSE ]⫸⫷⫸⫷⫸◆\n║\n║  ◈ /myInfo - Get your own info.\n║\n║  ◈ /botOwnerInfo - Know more about the ║ bot creator.\n║\n╠════🔗FOLLOW MY GITHUB════⧈\n║\n║ 🐱 GitHub: github.com/oligocodes👾\n║\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg === "/ping"){
    bot.sendMessage(chatId, `⏳️ Calculating ....`).then(() =>{
     const end = Date.now();
     const pingTime = end - start;
     bot.sendMessage(chatId, `╔⫷⫷⫷[⚡️OLIGO PULSE ]⫸⫸⫸◆\n║\n║ 💥 𖣘 PONG!\n║ ⏱️ 𖣘 Latency: ${pingTime}ms.\n║\n╠════🔗 LINK STABLE═════⧈\n║\n║ ⚙ AI CORE: ░░ SYNCED👾\n║\n╚[🥶Developer: Joseph Bonsu 🇬🇭]◆`);
})}else if(userMsg === "/myInfo"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👤 USER PROFILE ]⫸⫸⫸◆\n║\n║  ◈ First Name: ${userFirstName}\n║  ◈ Last Name: ${userLastName}\n║  ◈ Username: @${userName}\n║  ◈ User ID: ${userId}\n║\n╠════📎YOU LOOK AWESOME═══⧈\n║\n║ Hope you’re enjoying the bot! 😎\n║\n❂⊣ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ⊢❂`);
  }else if(userMsg === "/botOwnerInfo"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👑 BOT OWNER INFO ]⫸⫸⫸◆\n║\n║ ◈ Owner: OligoCodes\n║ ◈ Role: Developer & Architect 🤖\n║ ◈ Location: Ghana 🇬🇭\n║ ◈ Contact: https://t.me/OligoCodes\n║\n╠═════🌐 VISIT MY GITHUB═════⧈\n║\n║ GitHub: github.com/OligoCodes/\n║\n╠[💬 Follow My WhatsApp Channel]═⧈\n║   WhatsApp: [https://whatsapp.com/channel/0029VbB6vUk1NCrRjbDzKZ3W]\n║\n❂⊣꧁ ✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ✟ ꧂ ⊢❂`);
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
  }else if (userMsg === "/crypto"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👑 CRYPTO PULSE]⫸⫸⫸\n║\n║◈ /btc ⇒ Bitcoin current price 💰\n║ ◈ /eth ⇒ Ethereum current price 🧠\n║ ◈ /sol ⇒ Solana current price 🔮\n║ ◈ /bnb ⇒ Binance coin current price 🪙\n║ ◈ /ada ⇒ Cardano current price 💢\n║ ◈ /xrp ⇒ Ripple current price💠\n║\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg === "/btc"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
      const price = response.data.bitcoin.usd;

      bot.sendMessage(chatId, `✅️ The current price of BITCOIN💰 is\n   ❂⊣ $${price} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🧠`);
      }
  }else if(userMsg === "/eth"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      const ethPrice = response.data.ethereum.usd;

      bot.sendMessage(chatId, `✅️ The current price of ETHEREUM 🧠  is\n   ❂⊣ $${ethPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🧠`);
      }
  }else if(userMsg === "/sol"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`)
      const solPrice = response.data.solana.usd;

      bot.sendMessage(chatId, `✅️ The current price of SOLANA 🔮  is\n   ❂⊣ $${solPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/bnb"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`);
      const bnbPrice = response.data.binancecoin.usd;

      bot.sendMessage(chatId, `✅️ The current price of BINANCE COIN 🪙 is\n   ❂⊣ $${bnbPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💢`);
      }
  }else if(userMsg === "/ada"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`);
      const adaPrice = response.data.cardano.usd;

      bot.sendMessage(chatId, `✅️ The current price of CARDANO 💢  is\n   ❂⊣ $${adaPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/xrp"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`);
      const xrpPrice = response.data.ripple.usd;

      bot.sendMessage(chatId, `✅️ The current price of RIPPLE 💠  is\n   ❂⊣ $${xrpPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💠`);
      }
  }else if(userMsg === '/weather'){
      bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  👨‍💻 Type /weather cityname\n║   (eg. /weather Kasoa)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg.startsWith('/weather ')){
   const city = userMsg.slice(9).trim();
   if(!city){
    return bot.sendMessage(chatId, `❗️Enter a Valid City (eg. /weather Melbourne)`);
  }

   try {
       const apiKey = '6f0502b3360750ab87fa1531e26bf2c4';
       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
       const response = await axios.get(apiUrl);
       const data = response.data;

       const temp = data.main.temp;
       const feels = data.main.feels_like;
       const humidity = data.main.humidity;
       const condition = data.weather[0].description;
       const wind = data.wind.speed;
       const location = data.name;
       const country = data.sys.country;
       const iconCode = data.weather[0].icon;
       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

       const message = `<b>╔⫷⫷⫷[👑 WEATHER INFO ]⫸⫸⫸</b><b>\n║ 🌤️ Weather in ${location}, ${country}</b><b>\n║ 🌡️ Temperature:</b> ${temp}°C<b>\n║ 🤗 Feels Like:</b> ${feels}°C<b>\n║ 💧 Humidity:</b> ${humidity}%<b>\n║ 🌬️ Wind Speed:</b> ${wind} m/s<b>\n║ ☁️ Condition:</b> ${condition}<b>\n║</b><b> ║ 🖼️ <a href="${iconUrl}">View Icon</a></b><b>\n║ ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂</b>`;

       bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

   } catch (err) {
      console.error("Error: ", err);
      bot.sendMessage(chatId, '❌ City not found. Please check the name and try again.');
   }
  }else if(userMsg === '/img'){
      bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  👨‍💻 Type /img imagename\n║   (eg. /img skyscraper)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg.startsWith('/img ')){
    const imageName = userMsg.slice(5).trim();
    if(!imageName){
      return bot.sendMessage(chatId, `❗️${imageName} is a bad/invalid image name`)
    } 
    try{
      const unsplashKey = 'Q5sExZdXsNoniE1TMJ5vPePg6XHYpFthCtIjztPKhGY';
      const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(imageName)}&client_id=${unsplashKey}`;
      const response = await axios.get(unsplashUrl);
      const imageUrl = response.data.urls.regular;
      const author = response.data.user.name;

      bot.sendPhoto(chatId, imageUrl, {caption: `📸 Here is your ${imageName} image\n> Image by: _${author}_\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`, parse_mode: 'Markdown'});
    }catch(err){
      console.error("Error: ", err);
      bot.sendMessage(chatId, '❌ Image not found. Please check the image name and try again.');
    }
  }else if (userMsg === "/play"){
     bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  🎶 Type /play <songname>\n║   (eg. /play montagem bilião)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂` )
  }else if (userMsg.startsWith('/play ')) {
    const song = userMsg.slice(6).trim();
    if (!song) {
      return bot.sendMessage(chatId, '❗️ Please provide a song name. Example: `/play calm down`', { parse_mode: 'Markdown' });
    }

    try {
      const results = await require('yt-search')(song);
      const video = results.videos.length > 0 ? results.videos[0] : null;

      if (!video) {
        return bot.sendMessage(chatId, '❌ No video found for that song.');
      }

      const videoUrl = video.url;
      const outputFilePath = `./${chatId}_${Date.now()}.mp3`;

      bot.sendMessage(chatId, `🎧 Fetching "${video.title}"... Please wait.`);

      const stream = require('ytdl-core')(videoUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

      stream.on('error', (err) => {
        console.error('❌ Stream Error:', err);
        bot.sendMessage(chatId, '❌ Failed to fetch audio from YouTube.');
      });

      const ffmpegProcess = require('fluent-ffmpeg')(stream)
        .audioBitrate(128)
        .save(outputFilePath)
        .on('end', () => {
          bot.sendAudio(chatId, outputFilePath, {
            title: video.title,
            performer: video.author.name
          }).then(() => {
            require('fs').unlinkSync(outputFilePath);
          });
        })
        .on('error', (err) => {
          console.error('❌ FFmpeg Error:', err);
          bot.sendMessage(chatId, '❌ Error converting audio.');
        });

    } catch (err) {
      console.error('❌ General Error:', err);
      bot.sendMessage(chatId, '⚠️ An unexpected error occurred.');
    }
  }else{
      bot.sendMessage(chatId, `I don't understand that yet 😑, I am still under development by github.com/oligocodes\nAnyways try using /help for a list of commands ★ `);  }
  });
