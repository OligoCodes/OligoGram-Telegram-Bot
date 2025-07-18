const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const token = process.env.token;

const bot = new TelegramBot(token, {polling : true});

//messages
bot.on('message', (msg) => {
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
    const opts = {
      reply_markup : {
      inline_keyboard : [
        [
          { text: "𝗝𝗢𝗜𝗡 𝗢𝗟𝗜𝗚𝗢𝗧𝗘𝗖𝗛 𝗡𝗢𝗪 👑", url: "https://t.me/OligoTech"}
        ]
      ]
      }
    };
    bot.sendMessage(chatId, `🖐 Welcome ${userName} to OligoGram Bot! your friendly Telegram Bot develped by Joseph Bonsu 🇬🇭\n\n Please click the button below 👇 to follow my community 🤗`, opts);
  }else if(userMsg === "/help" || userMsg === "/help@oligogram_bot" ){
    bot.sendMessage(chatId, `꧁ ✨ Available Commands ✨️ ꧂\n\n⧈⧈⧈⧈⧈⧈⧈⧈ BASIC ⧈⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /info ⇒ User info and botOwner info 👤 \n◈ /start ⇒ Starts the bot 🤖\n◈ /help ⇒ Shows this help message 🚸\n◈ /ping ⇒ Check bot's response time 🎯\n◈ /photo ⇒ Sends a particular photo 📸\n◈ /sticker ⇒ Sends crying sticker 🤣\n◈ /alive ⇒ Sends ping song ⏸️\n◈ /ownerPic ⇒ An iconic portrait of the bot programmer 🤯👾\n\n⧈⧈⧈⧈⧈⧈⧈⧈⧈ DATA ⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈/img - Displays a random image 🖼\n◈ /crypto - Decent list of crypto prices 💰\n◈ /weather ⇒ Weather in your city ☁️\n◈ /play ⇒ Play a song from title(not active yet)\n\n⧈⧈⧈⧈⧈⧈ FUNCTIONALS ⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /math ⇒ Basic math calculations 🔢\n\n⧈⧈⧈⧈⧈⧈⧈⧈ FUN ⧈⧈⧈⧈⧈⧈⧈⧈⧈\n\n◈ /joke ⇒ Random Jokes 😃\n\n꧁✨️  𝑷𝒐𝒘𝒆𝒓𝒆𝒅  𝒃𝒚  𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉  ✨️꧂`);
  }else if(userMsg === "/info"){
    bot.sendMessage(chatId, `╔⫷⫸⫷⫸⫷[⚡️INFO PULSE ]⫸⫷⫸⫷⫸◆\n║\n║  ◈ /myInfo - Get your own info.\n║\n║  ◈ /botOwnerInfo - Know more about the ║ bot creator.\n║\n╠════🔗FOLLOW MY GITHUB════⧈\n║\n║ 🐱 GitHub: github.com/oligocodes👾\n║\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg === "/ping" || userMsg === "/ping@oligogram_bot"){
    bot.sendMessage(chatId, `⏳️ Calculating ....`).then(() =>{
     const end = Date.now();
     const pingTime = end - start;
     bot.sendMessage(chatId, `╔⫷⫷⫷[⚡️OLIGO PULSE ]⫸⫸⫸◆\n║\n║ 💥 𖣘 PONG!\n║ ⏱️ 𖣘 Latency: ${pingTime}ms.\n║\n╠════🔗 LINK STABLE═════⧈\n║\n║ ⚙ AI CORE: ░░ SYNCED👾\n║\n╚[🥶Developer: Joseph Bonsu 🇬🇭]◆`);
})}else if(userMsg === "/myInfo" || userMsg === "/myInfo@oligogram_bot"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👤 USER PROFILE ]⫸⫸⫸◆\n║\n║  ◈ First Name: ${userFirstName}\n║  ◈ Last Name: ${userLastName}\n║  ◈ Username: @${userName}\n║  ◈ User ID: ${userId}\n║\n╠════📎YOU LOOK AWESOME═══⧈\n║\n║ Hope you’re enjoying the bot! 😎\n║\n❂⊣ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ⊢❂`);
  }else if(userMsg === "/botOwnerInfo" || userMsg === "/botOwnerInfo@oligogram_bot"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👑 BOT OWNER INFO ]⫸⫸⫸◆\n║\n║ ◈ Owner: OligoCodes\n║ ◈ Role: Developer & Architect 🤖\n║ ◈ Location: Ghana 🇬🇭\n║ ◈ Contact: https://t.me/OligoCodes\n║\n╠═════🌐 VISIT MY GITHUB═════⧈\n║\n║ GitHub: github.com/OligoCodes/\n║\n╠[💬 Follow My WhatsApp Channel]═⧈\n║   WhatsApp: [https://whatsapp.com/channel/0029VbB6vUk1NCrRjbDzKZ3W]\n║\n❂⊣꧁ ✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ✟ ꧂ ⊢❂`);
  }else if(userMsg === "/photo" || userMsg === "/photo@oligogram_bot"){
      const photoUrl = `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300`;
      const caption = {caption : `👾 Here is a photo 📸`};
      bot.sendPhoto(chatId, photoUrl, caption);
  }else if(userMsg === "/ownerPic" || userMsg === "/ownerPic@oligogram_bot"){
      const ownerPhotoDir = `./oligo.jpg`;
      const caption = {caption : `OligoCodes, bot Owner, tech Enthusiast and  Developer from Ghana 🇬🇭. ... 🌍`};
      bot.sendPhoto(chatId, ownerPhotoDir, caption);
  }else if(userMsg === "/sticker" || userMsg === "/sticker@oligogram_bot"){
     const stickerId = `CAACAgQAAxkBAhwn6Wh3VuRB7LlzXLhKpx2Xz1SUSFcKAAIUGgACr9qAU3JPwjHUF0t6NgQ`;
     bot.sendSticker(chatId, stickerId);
  }else if(userMsg === "/alive" || userMsg === "/alive@oligogram_bot"){
     const musicUrl = `https://audio.jukehost.co.uk/v9WTpehCB4JVTY5i1DYLLUSOvavZMOmy.mp3`;
     const details = {caption : `I'm always alive ${username} 👻👻👻\n\n❂⊣ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ⊢❂`, title: `Alive 👽` ,performer: `OligoCodes 💠`, thumb : `./oligo.jpg`};
     bot.sendAudio(chatId, musicUrl, details);
  }if (userMsg === "/crypto" || userMsg === "/crypto@oligogram_bot"){
     const croyce = {
       reply_markup: {
         inline_keyboard:[
           //row 1⬇️
           [
             {text: "𝗕𝗧𝗖💰", callback_data: "/btc"}, {text: "𝗘𝗧𝗛💠", callback_data: "/eth"}, {text: "𝗦𝗢𝗟🔮", callback_data: "/sol"}
           ],
           //row 2 ⬇️
           [
             {text: "𝗕𝗡𝗕🪙", callback_data: "/bnb"}, {text: "𝗔𝗗𝗔💢", callback_data: "/ada"}, {text: "𝗫𝗥𝗣🔆", callback_data: "/xrp"}
           ]
         ] 
       }
     }
     bot.sendMessage(chatId, `📊 Welcome ${userName} to the OligoTech Crypto Dashboard\n\nTrack real-time prices for the top cryptocurrencies, including Bitcoin, Ethereum, Solana, and more.\n\nTap any coin below to view its current market value.\n\n🔄 Data updates automatically | 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭 `, croyce, {parse_mode: 'Markdown'});
  }else if(userMsg === "/math" || userMsg === "math@oligogram_bot"){
      bot.sendMessage(chatId,  `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║➕️ /add a+b ⇒ a plus b\n║➖️  /subt a-b ⇒ a minus b\n║✖️  /mul a×b ⇒ a multiplied by b\n║➗️  /div a÷b ⇒ a divided by b\n║〰️  /sqrt a ⇒ square root of a\n║➿️  /rem a&b ⇒ remainder of a/b\n║♻️  /round a ⇒ round a\n║🔃  /exp a^b ⇒ a to the power b\n║🔯 /gen a(b÷c)+d ⇒ for general expressions\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`)
  }else if(userMsg.startsWith('/add ')){
      const addition = userMsg.slice(5).trim();
      const add = eval(addition);
      bot.sendMessage(chatId,  `➕️ The answer is ${add} ➕️`);
  }else if(userMsg.startsWith('/subt ')){
      const subtraction = userMsg.slice(6).trim();
      const subt = eval(subtraction);
      bot.sendMessage(chatId,  `➖️ The answer is ${subt} ➖️`);
  }else if(userMsg.startsWith('/mul ')){
      const multiplication = userMsg.slice(5).trim();
      const multi = multiplication.replace("×", "*")
      const mul = eval(multi);
      bot.sendMessage(chatId,  `✖️ The answer is ${mul} ✖️`)
  }else if(userMsg.startsWith('/div ')){
      const division = userMsg.slice(5).trim();
      const divi = division.replace("÷", "/")
      const div = eval(divi);
      bot.sendMessage(chatId,  `➗️ The answer is ${add} ➗️`)
  }else if(userMsg.startsWith('/sqrt ')){
      const root = userMsg.slice(6).trim();
      const expression = root + "**0.5";
      const sqrt = eval(expression);
      bot.sendMessage(chatId,  `〰️ The answer is ${sqrt} 〰️`)
  }else if(userMsg.startsWith('/rem ')){
      const remainder = userMsg.slice(5).trim();
      const remain = remainder.replace("&", "%");
      const rem = eval(remainder);
      bot.sendMessage(chatId,  `➿️ The answer is ${rem} ➿️`)
  }else if(userMsg.startsWith('/round ')){
      const rounding = userMsg.slice(7).trim();
      const round = Math.round(parseInt(rounding));
      bot.sendMessage(chatId,  `♻️ The answer is ${round} ♻️`)
  }else if(userMsg.startsWith('/exp ')){
      const exponent = userMsg.slice(5).trim();
      const num = exponent.charAt(3);
      const expo = exponent.replace("^", `**${num}`)
      const exp = eval(expo);
      bot.sendMessage(chatId,  `🔃 The answer is ${exp} 🔃`)
  }else if(userMsg.startsWith('/gen ')){
      const statement = userMsg.slice(5).trim();
      const deal = statement.replaceAll("÷", "/").replaceAll("×", "*");
      const correctSyntax = deal.replace(/[(]/g, "*(");
      const gen = eval(correctSyntax);
      bot.sendMessage(chatId,  `🔯 The answer is ${gen} 🔯`);
  }else if(userMsg.includes('😂') || userMsg.includes('lol') || userMsg.includes('haha') || userMsg.includes('funny')){
      bot.sendMessage(chatId,  `😂 ${userName},  what's funny?`)
  }
});

//image generation
bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const userMsg = msg.text;
   const chatType = msg.chat.type;

   if (!userMsg || (chatType === 'channel')) return; 
   if(userMsg === '/img' || userMsg === "/img@oligogram_bot"){
      bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  👨‍💻 Type /img <imagename>\n║   (eg. /img skyscraper)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
    }else if(userMsg.startsWith('/img ')){
       const imageName = userMsg.slice(5).trim();
       if(!imageName){
      return bot.sendMessage(chatId, `❗️ Please provide a valid image name`)
    } 
     try{
       const unsplashKey = 'Q5sExZdXsNoniE1TMJ5vPePg6XHYpFthCtIjztPKhGY';
       const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(imageName)}&client_id=${unsplashKey}`;
       const response = await axios.get(unsplashUrl);
       if (!response) {
         const okBtn = {reply_markup: {inline_keyboard: [[{text: "𝗢𝗞" , callback_data: "ok"}]]}};
         return bot.sendMessage(chatId,  `Too many images have been requested,  please wait for tomorrow`, okBtn);
       }
       const imageUrl = response.data.urls.regular;
       const author = response.data.user.name;

       bot.sendPhoto(chatId, imageUrl, {caption: `📸 Here is your ${imageName} image\n> Image by: _${author}_\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`, parse_mode: 'Markdown'});
    }catch(err){
       console.error("Error: ", err);
       bot.sendMessage(chatId, '❌ Image not found. Please check the image name and try again.');
    }
}
});

//image generation call 
bot.on('callback_query' , (query) => {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;
  const data = query.data;

  if(data === "ok" || data === "ok@oligogram_bot"){
    bot.deleteMessage(chatId, msgId);
  }
})


//jokes
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;

  if (!userMsg || (chatType === 'channel')) return; 
  if(userMsg === '/joke' || userMsg === "/joke@oligogram_bot"){
      try{
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const data = response.data;
      const type = data.type;
      const setup = data.setup;
      const joke = data.punchline;
      const emojis = ['🤣','😝','🤡','🤪','😂','💧','🃏','🎭','🗿','🥶']
      const random = Math.floor(Math.random() * emojis.length);
      const jokeEmoji = emojis[random];
      const stickers = ['CAACAgQAAyEFAASTXAzcAAEM4HNoZkVFqCZVlugdEOolOOBf_LaAzgACBBQAAuzoWFAd7hpIus3k1zYE','CAACAgQAAx0CeDijFQABCr3taGYsZZcT7hTJjzYeoWJXnF65HGIAAmsXAALqqHBQYIoct8qxxxI2BA','CAACAgUAAxkBAhy87Wh4-uPgIlYDxKEhbOzzppgGs75lAAKNCQAC7qGIVJJVLkU40Gc7NgQ','CAACAgQAAxkBAhy8_2h4-wMaVHz3TtC0xNuWq_GnFy6SAAKMFQACE6gpUq2xwgv9VN2cNgQ','CAACAgQAAx0CVU5WcgABFcRraGZSj2Ai0n_V-jgp60ox_pLYIToAAp8SAAL343BQEY0O391vM902BA','CAACAgQAAxkBAhy9QGh4-5adS7FRH26Z1RYUmhMEBNmoAAIjFgACqbSxUttQ6OsG3M5SNgQ','CAACAgUAAxkBAhzbmWh5YU7WzrQbwwxj34dJh_YdDnCaAAIrEgACN8d5VTuN6w5_BNcgNgQ','CAACAgQAAxkBAhy9ZWh4--v_5nd1TgX9CH9khQz7rtYsAAIJAAOj9eEjxn2-Qm_Btw02BA','CAACAgQAAxkBAhy9fGh4_ClnwSo7zM326AxQdLjuIrsEAAKBDQACoPAoUyMh44iwzRCZNgQ','CAACAgQAAyEFAASPUhSqAAL792hyhicqxZO6Shi0uVyHiEYLMx-zAAJQDwACyX3ZUmk9BfZLj_DfNgQ','CAACAgQAAxkBAhy9s2h4_KoL3IU-sijWV2kKEXTjLv5gAAIyDwACShkhUBr3mb1Sf_YgNgQ','CAACAgQAAx0CbIzk6AABFLQmaGZWx3H8GPiyQkJfJe95ZTVrn14AAmQKAAJsY8hTr-3X2sVdT2w2BA','CAACAgQAAxkBAhy90Gh4_OIfHMiBXoRixiOldYAfnKuEAAI0CwACtrPoU0QeSoZuvWZ1NgQ','CAACAgQAAyEFAASanNxoAAECF4dob6OxSIc5iquIvAT3sbBU7rtjKQACuBgAAuiPgFOopbMnWsglxTYE','CAACAgQAAxkBAhy-AAFoeP1Its3CfI8-Q8XARZZHVHY0XgAClRcAAtGmwVP5tR-H5gaUnTYE']
      const randome = Math.floor(Math.random() * stickers.length)
      const stickerId = stickers[randome]

      bot.sendMessage(chatId, `Preparing *${type}* joke 😃 ...`, {parse_mode : 'Markdown'});
      bot.sendMessage(chatId, `◈◈◈◈◈◈[🤡 \`JOKE\`]◈◈◈◈◈\n\n$_${setup}_...\n\n ${jokeEmoji} ${joke} ${jokeEmoji}\n\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂` , {parse_mode: 'Markdown'});
      bot.sendSticker(chatId, `${stickerId}`);
        
      }catch(e){
         console.error("Error ", e)
         bot.sendMessage(chatId, "🥶 Joke not found")
       }
      }
});


//weather
bot.on('message' , async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
const chatType = msg.chat.type;


  if (!userMsg || (chatType === 'channel')) return; 
  if(userMsg === '/weather' || userMsg === "/weather@oligogram_bot"){
      bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  👨‍💻 Type /weather <cityname>\n║   (eg. /weather Kasoa)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
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

       const message = `<b>╔⫷⫷⫷[👑 WEATHER INFO ]⫸⫸⫸</b><b>\n║ 🌤️ Weather in ${location}, ${country}</b><b>\n║ 🌡️ Temperature:</b> ${temp}°C<b>\n║ 🤗 Feels Like:</b> ${feels}°C<b>\n║ 💧 Humidity:</b> ${humidity}%<b>\n║ 🌬️ Wind Speed:</b> ${wind} m/s<b>\n║ ☁️ Condition:</b> ${condition}<b>\n║</b><b>\n║ 🖼️ <a href="${iconUrl}">View Icon</a></b><b>\n║ ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂</b>`;

       bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

   } catch (err) {
      console.error("Error: ", err);
      bot.sendMessage(chatId, '❌ City not found. Please check the name and try again.');
   }
  }
});


//crypto call
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,cardano,ripple&vs_currencies=usd`);
    
    if (data === "/btc" || data === "/btc@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of BITCOIN💰 is\n   ❂⊣ $${response.data.bitcoin.usd} ⊢❂`);
      } catch (e) {
        console.error("BTC error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 💰`);
      }

    } else if (data === "/eth" || data === "/eth@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of ETHEREUM 🧠 is\n   ❂⊣ $${response.data.ethereum.usd} ⊢❂`);
      } catch (e) {
        console.error("ETH error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 🧠`);
      }

    } else if (data === "/sol" || data === "/sol@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of SOLANA 🔮 is\n   ❂⊣ $${response.data.solana.usd} ⊢❂`);
      } catch (e) {
        console.error("SOL error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 🔮`);
      }

    } else if (data === "/bnb" || data === "/bnb@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of BINANCE COIN 🪙 is\n   ❂⊣ $${response.data.binancecoin.usd} ⊢❂`);
      } catch (e) {
        console.error("BNB error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 🪙`);
      }

    } else if (data === "/ada" || data === "/ada@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of CARDANO 💢 is\n   ❂⊣ $${response.data.cardano.usd} ⊢❂`);
      } catch (e) {
        console.error("ADA error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 💢`);
      }

    } else if (data === "/xrp" || data === "/xrp@oligogram_bot") {
      try {
        bot.sendMessage(chatId, `✅️ The current price of RIPPLE 💠 is\n   ❂⊣ $${response.data.ripple.usd} ⊢❂`);
      } catch (e) {
        console.error("XRP error:", e);
        bot.sendMessage(chatId, `🚫Failed to fetch crypto 💠`);
      }
    }

  } catch (e) {
    console.error("General API error:", e);
    bot.sendMessage(chatId, `🚫Couldn't connect to the price server.`);
  }
});

//incoming members 
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;
  
  newMembers.forEach( memberCome => {
    const userCome = memberCome.first_name || "there";
    
    bot.sendMessage(chatId,  `Hello *${userCome}* , you are dearly welcome to this group!🤗\n Hope you are doing great?\n\n꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂` , {parse_mode: 'Markdown'});
  })
});

//leaving members
bot.on('left_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const leftMembers = msg.left_chat_members;
  
  leftMembers.forEach( memberGone => {
    const userGone = memberGone.first_name || "there";
    
    bot.sendMessage(chatId,  `Arigato *${userGone}* , till we meet again on this group!🫡\n Please share the group link.\n\n꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂` , {parse_mode: 'Markdown'});
  })
});

