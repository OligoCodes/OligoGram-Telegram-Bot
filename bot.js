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
  const chatType = msg.chat.type;
  const userFirstName = msg.from.first_name || "Unknown";
  const userLastName = msg.from.last_name || "Unknown";
  const userName = msg.from.username || "Unknown";

  if (!userMsg || (chatType === 'channel')) return; 
  if (userMsg === "/start"){
    bot.sendMessage(chatId, `🖐 Welcome to OligoGram Bot! your friendly Telegram Bot develped by Joseph Bonsu 🇬🇭, Please follow my OligoTech Channel at https://t.me/OligoTech for more tech updates and insights.\n\nType /help to see what I can do.`);
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
     const musicUrl = `./Alive.mp3`;
     const details = {caption : `I'm always alive buddy ${username}`, title: `Montagem Xonada`,performer: `OligoCodes 💠`, thumb : `./oligo.jpg`};
     bot.sendAudio(chatId, musicUrl, details);
  }else if (userMsg === "/crypto" || userMsg === "/crypto@oligogram_bot"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👑 CRYPTO PULSE]⫸⫸⫸\n║\n║◈ /btc ⇒ Bitcoin current price 💰\n║ ◈ /eth ⇒ Ethereum current price 🧠\n║ ◈ /sol ⇒ Solana current price 🔮\n║ ◈ /bnb ⇒ Binance coin current price 🪙\n║ ◈ /ada ⇒ Cardano current price 💢\n║ ◈ /xrp ⇒ Ripple current price💠\n║\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
  }else if(userMsg === "/btc" || userMsg === "/btc@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
      const price = await response.data.bitcoin.usd;

      bot.sendMessage(chatId, `✅️ The current price of BITCOIN💰 is\n   ❂⊣ $${price} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🧠`);
      }
  }else if(userMsg === "/eth" || userMsg === "/eth@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      const ethPrice = await response.data.ethereum.usd;

      bot.sendMessage(chatId, `✅️ The current price of ETHEREUM 🧠  is\n   ❂⊣ $${ethPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🧠`);
      }
  }else if(userMsg === "/sol" || userMsg === "/sol@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`)
      const solPrice = await response.data.solana.usd;

      bot.sendMessage(chatId, `✅️ The current price of SOLANA 🔮  is\n   ❂⊣ $${solPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/bnb" || userMsg === "/bnb@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`);
      const bnbPrice = await response.data.binancecoin.usd;

      bot.sendMessage(chatId, `✅️ The current price of BINANCE COIN 🪙 is\n   ❂⊣ $${bnbPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💢`);
      }
  }else if(userMsg === "/ada" || userMsg === "/ada@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`);
      const adaPrice = await response.data.cardano.usd;

      bot.sendMessage(chatId, `✅️ The current price of CARDANO 💢  is\n   ❂⊣ $${adaPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto🔮`);
      }
  }else if(userMsg === "/xrp" || userMsg === "xrp@oligogram_bot"){
    try{
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`);
      const xrpPrice = await response.data.ripple.usd;

      bot.sendMessage(chatId, `✅️ The current price of RIPPLE 💠  is\n   ❂⊣ $${xrpPrice} ⊢❂`);
      }catch(e){

      console.error("Error: ", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto💠`);
      }
  }else if(userMsg === '/weather' || userMsg === "/weather@oligogram_bot"){
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
  }else if(userMsg === '/img' || userMsg === "/img@oligogram_bot"){
      bot.sendMessage(chatId, `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║  👨‍💻 Type /img <imagename>\n║   (eg. /img skyscraper)\n║\n║\n ❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂`);
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
      bot.sendMessage(chatId,  `➕️ The answer is ${rem} ➕️`)
  }else if(userMsg.startsWith('/round ')){
      const rounding = userMsg.slice(7).trim();
      const round = Math.round(parseInt(rounding));
      bot.sendMessage(chatId,  `♻️ The answer is ${round} ♻️`)
  }else if(userMsg.startsWith('/exp ')){
      const exponent = userMsg.slice(5).trim();
      const exp = eval(exponent);
      bot.sendMessage(chatId,  `🔃 The answer is ${exp} 🔃`)
  }else if(userMsg.startsWith('/gen ')){
      const statement = userMsg.slice(5).trim();
      const deal = statement.replaceAll("÷", "/").replaceAll("×", "*");
      const correctSyntax = deal.replace(/[(]/g, "*(");
      const gen = eval(correctSyntax);
      bot.sendMessage(chatId,  `🔯 The answer is ${gen} 🔯`);
  }else if(userMsg === '/joke' || userMsg === "/joke@oligogram_bot"){
      try{
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const data = response.data;
      const type = data.type;
      const setup = data.setup;
      const joke = data.punchline;
      const emojis = ['🤣','😝','🤡','🤪','😂','💧','🃏','🎭','🗿','🥶']
      const random = Math.floor(Math.random() * emojis.length);
      const jokeEmoji = emojis[random];
      const stickers = ['CAACAgQAAyEFAASTXAzcAAEM4HNoZkVFqCZVlugdEOolOOBf_LaAzgACBBQAAuzoWFAd7hpIus3k1zYE','CAACAgQAAx0CeDijFQABCr3taGYsZZcT7hTJjzYeoWJXnF65HGIAAmsXAALqqHBQYIoct8qxxxI2BA','CAACAgUAAxkBAhy87Wh4-uPgIlYDxKEhbOzzppgGs75lAAKNCQAC7qGIVJJVLkU40Gc7NgQ','CAACAgQAAxkBAhy8_2h4-wMaVHz3TtC0xNuWq_GnFy6SAAKMFQACE6gpUq2xwgv9VN2cNgQ','CAACAgQAAx0CVU5WcgABFcRraGZSj2Ai0n_V-jgp60ox_pLYIToAAp8SAAL343BQEY0O391vM902BA','CAACAgQAAxkBAhy9QGh4-5adS7FRH26Z1RYUmhMEBNmoAAIjFgACqbSxUttQ6OsG3M5SNgQ','CAACAgQAAyEFAASKpiv4AAECp0doaUtBxE1pgfLF_ddqpMo9NR9YugACjRQAAj6xsFKHZNYDsivA-DYE','CAACAgQAAxkBAhy9ZWh4--v_5nd1TgX9CH9khQz7rtYsAAIJAAOj9eEjxn2-Qm_Btw02BA','CAACAgQAAxkBAhy9fGh4_ClnwSo7zM326AxQdLjuIrsEAAKBDQACoPAoUyMh44iwzRCZNgQ','CAACAgQAAyEFAASPUhSqAAL792hyhicqxZO6Shi0uVyHiEYLMx-zAAJQDwACyX3ZUmk9BfZLj_DfNgQ','CAACAgQAAxkBAhy9s2h4_KoL3IU-sijWV2kKEXTjLv5gAAIyDwACShkhUBr3mb1Sf_YgNgQ','CAACAgQAAx0CbIzk6AABFLQmaGZWx3H8GPiyQkJfJe95ZTVrn14AAmQKAAJsY8hTr-3X2sVdT2w2BA','CAACAgQAAxkBAhy90Gh4_OIfHMiBXoRixiOldYAfnKuEAAI0CwACtrPoU0QeSoZuvWZ1NgQ','CAACAgQAAyEFAASanNxoAAECF4dob6OxSIc5iquIvAT3sbBU7rtjKQACuBgAAuiPgFOopbMnWsglxTYE','CAACAgQAAxkBAhy-AAFoeP1Its3CfI8-Q8XARZZHVHY0XgAClRcAAtGmwVP5tR-H5gaUnTYE']
      const randome = Math.floor(Math.random() * stickers.length)
      const stickerId = stickers[randome]

      bot.sendMessage(chatId, `Preparing *${type}* joke 😃 ...`, {parse_mode : 'Markdown'});
      bot.sendMessage(chatId, `◈◈◈◈◈◈[🤡 \`JOKE\`]◈◈◈◈◈\n\n$_${setup}_...\n\n ${jokeEmoji} ${joke} ${jokeEmoji}\n\n❂⊣꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂⊢❂` , {parse_mode: 'Markdown'});
      bot.sendSticker(chatId, ${stickerId});
        
      }catch(e){
         console.error("Error ", e)
         bot.sendMessage(chatId, "🥶 Joke not found")
       }
      }else{
        bot.sendMessage(chatId,  `Stop saying ${userMsg} 🙃`);
  }
});

bot.on("newChatMembers", (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;
  
  newMembers.forEach( member => {
    const user = member.first_name || "there";
    
    bot.sendMessage(chatId,  `Hello *${user}* , you are dearly welcome to this group!🤗\n Hope you are doing great?\n\n꧁✟ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 🇬🇭✟꧂` , {parse_mode: 'Markdown'});
  });
})
