const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs')
require('dotenv').config();

const token = process.env.token;

const bot = new TelegramBot(token, {polling : true});

const oligoTechChannel = '@OligoTech'

//messages
bot.on('message', async (msg) => {
  const start = Date.now()
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const msgId = msg.message_id;
  const userFirstName = msg.from.first_name || "Seniorman";
  const userLastName = msg.from.last_name || "Seniorman";
  const userName = msg.from.username || "Seniorman";
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);

  
  if (!userMsg || (chatType === 'channel')) return; 
  else if(userMsg === "/start"){
    const opts = {
      reply_markup : {
      inline_keyboard : [
        [
          { text: "𝗝𝗢𝗜𝗡 𝗢𝗟𝗜𝗚𝗢𝗧𝗘𝗖𝗛 𝗡𝗢𝗪 👑", url: "https://t.me/OligoTech"}
        ],
        [
          {text:  "𝗩𝗘𝗥𝗜𝗙𝗬 ✅️", callback_data: 'verify'}
        ]
      ]
      }
    };
    bot.sendMessage(chatId, `🖐 Welcome ${userName} to OligoGram Bot! your friendly Telegram Bot develped by Joseph Bonsu 🇬🇭\n\n Please click the button below 👇 to follow my community in order to get access to my features🤗`, opts);
  }
  if(!isMember)return!
  else if(userMsg === "/info"){
    bot.sendMessage(chatId, `╔⫷⫸⫷⫸⫷[⚡️INFO PULSE ]⫸⫷⫸⫷⫸◆\n║\n  ◈ /myInfo - Get your own info.\n║\n║  ◈ /botOwnerInfo - Know more about the bot creator.\n\n❂⊣ 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭 ⊢❂`);
  }else if(userMsg === "/ping" || userMsg === "/ping@oligogram_bot"){
    bot.sendMessage(chatId, `⏳️ Calculating ....`).then(() =>{
     const end = Date.now();
     const pingTime = end - start;
     bot.sendMessage(chatId, `╔⫷⫷⫷[⚡️OLIGO PULSE ]⫸⫸⫸◆\n║\n║ 💥 𖣘 PONG!\n║ ⏱️ 𖣘 Latency: ${pingTime}ms.\n║\n╠════🔗 LINK STABLE═════⧈\n║\n║ ⚙ AI CORE: ░░ SYNCED👾\n║\n╚[🥶Developer: Joseph Bonsu 🇬🇭]◆`);
})}else if(userMsg === "/myInfo" || userMsg === "/myInfo@oligogram_bot"){
    bot.sendMessage(chatId, `╔⫷⫷⫷[👤 USER PROFILE ]⫸⫸⫸◆\n║\n║  ◈ First Name: ${userFirstName}\n║  ◈ Last Name: ${userLastName}\n║  ◈ Username: @${userName}\n║  ◈ User ID: ${userId}\n║\n╠════📎YOU LOOK AWESOME═══⧈\n║\n║ Hope you’re enjoying the bot! 😎\n║\n❂⊣ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑶𝒍𝒊𝒈𝒐𝑻𝒆𝒄𝒉 ⊢❂`);
  }else if(userMsg === "/botOwnerInfo" || userMsg === "/botOwnerInfo@oligogram_bot"){
    buttons = {
      reply_markup: {
        inline_keyboard: [
          [
            {text: '🐱 𝗠𝗬 𝗚𝗜𝗧𝗛𝗨𝗕', url: 'https://github.com/OligoCodes'},  {text: '💬 𝗝𝗢𝗜𝗡 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣', url: 'https://whatsapp.com/channel/0029VbB6vUk1NCrRjbDzKZ3W'}
          ]
        ]
      }
    }
    bot.sendMessage(chatId, `⫷⫷⫷[👑 BOT OWNER INFO ]⫸⫸⫸\n║\n ◈ Owner: 𝗝𝗼𝘀𝗲𝗽𝗵 𝗞𝘄𝗮𝗯𝗲𝗻𝗮 𝗢𝘀𝗲𝗶 𝗕𝗼𝗻𝘀𝘂(OligoCodes)\n║ ◈ Role: Developer & Architect 🤖\n║ ◈ Location: Kasoa, Ghana 🇬🇭\n║ ◈ Contact: https://t.me/OligoCodes\n\n 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭 `, buttons);
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
     const audios = ['Matushka.mp3','Alive.mp3','KSI.mp3','Bailão.mp3','Donzzy.mp3']
     const randoMusic = audios[Math.floor(Math.random()*audios.length)]
     const musicUrl = `https://raw.githubusercontent.com/OligoCodes/OligoGram-Telegram-Bot/main/${randoMusic}`;
     const details = { caption : `I'm always alive Seniorman 👻👻👻\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭` ,title: `𝗔𝗹𝗶𝘃𝗲 👽` ,performer: 'OligoGram 💠', thumb : 'https://raw.githubusercontent.com/OligoCodes/OligoGram-Telegram-Bot/main/OligoGram_bot.jpg'};
     bot.sendAudio(chatId, musicUrl, details);
  }else if(userMsg === "/crypto" || userMsg === "/crypto@oligogram_bot"){
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
      bot.sendMessage(chatId,  `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n║ ➕️ /add a+b ⇒ a plus b\n║ ➖️  /subt a-b ⇒ a minus b\n║ ✖️  /mul a×b ⇒ a multiplied by b\n║ ➗️  /div a÷b ⇒ a divided by b\n║ 〰️  /sqrt a ⇒ square root of a\n║ ➿️  /rem a&b ⇒ remainder of a/b\n║ ♻️  /round a ⇒ round a\n║ 🔃  /exp a^b ⇒ a to the power b\n║ 🔯 /gen a(b÷c)+d ⇒ for general expressions\n║\n  📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭` , {reply_to_message_id: msgId})
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
  }else if(userMsg.includes('😂') || userMsg.includes('lol') || userMsg.includes('haha') || userMsg.includes('funny') || userMsg.includes('LOL') || userMsg.includes('🤣')){
      bot.sendMessage(chatId,  `😂 ${userName},  what's funny?`, {reply_to_message_id: msgId})
  }
});

//recive channel member verification 
bot.on('callback_query' , async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.message.from.id;
  const data = query.data;

  if(data === 'verify'){
    try{
      const res = await bot.getChatMember(oligoTechChannel, userId);
      const status = res.status;
      const approvedRank = ['member','administrator', 'creator'];
      if (approvedRank.includes(status)){

        bot.sendMessage(chatId,  `Congrats🎉👏`)
        bot.emit("message", { chat : {id :chatId}, from: {id : userId}, text: '/help'}); 
      }else{
        bot.sendMessage(chatId,  `Please Join OLIGOTECH👨‍💻 and try again!!!`)
      }
      
    }catch(e){
      console.error('Verification Error: ', e)
      bot.sendMessage(chatId, `🚫 Couldn't Verify your membership,  kindly join and try again`)
    }
  }
    
})

//new menu
bot.on('message' , async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);


  if(!userMsg || chatType === 'channel' || !isMember) return;
  if (userMsg === '/help'){
    const message = `🤖 𝗔𝗹𝗹-𝗶𝗻-𝗢𝗻𝗲 𝗕𝗼𝘁 𝗠𝗲𝗻𝘂\n\nExplore commands by category: Basics, Fun, Tools, or Data.\n\nTap a button below to begin.\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`;
    const buttons = {
      reply_markup: {
        inline_keyboard: [
          [{text: '💠 𝗕𝗔𝗦𝗜𝗖',callback_data: 'basic'},{text: '📊 𝗗𝗔𝗧𝗔',callback_data: 'data'}],
          [{text: '🎭 𝗙𝗨𝗡', callback_data: 'fun'},{text: '🛠️ 𝗧𝗢𝗢𝗟𝗦', callback_data: 'tools'}]
        ]
      }
    }

    bot.sendMessage(chatId,  message, buttons)
  }
  
})

//query for /help
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const chatType = query.message.chat.type;
  const msgId = query.message.message_id;
  const data = query.data;
  const queryId = query.id;

  if(!data || chatType === 'channel') return;
  if (data === 'basic'){
    bot.editMessageText(`\n◈ /start   - Start the bot 🤖  \n◈ /help   - Show this help message 🚸  \n◈ /ping   - Check bot’s response time 🎯  \n◈ /info   - Show user and bot owner info 👤  \n◈ /photo   - Send a particular photo 📸  \n◈ /sticker   - Send a crying sticker 🤣  \n◈ /alive   - Send the ping song ⏸️  \n◈ /ownerPic   - Show the bot programmer’s portrait 🤯👾\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, 
    {
      chat_id : chatId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: [
          [{text: '🔙 𝗕𝗮𝗰𝗸',callback_data: 'helpPage'}]
        ]
      }
    });
  }else if (data === 'tools'){
    bot.editMessageText(`\n/whaspy   ⇒ Get WhatsApp profile pic 📱  \n/math  ⇒ Solve math expressions 🧠  \n/qr  ⇒ Create QR code 🔳 \n/pgen  ⇒ Generate secure passwords 🔐  \n/bot  ⇒ Access bot tools menu 🧰\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, 
    {
      chat_id : chatId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: [
          [{text: '🔙 𝗕𝗮𝗰𝗸',callback_data: 'helpPage'}]
        ]
      }
    });
  }else if (data === 'data'){
    bot.editMessageText(`\n/weather  ⇒ Get weather info 🌦️  \n/crypto  ⇒ Show cryptocurrency prices 💰  \n/qalc  ⇒ Quick calculator 🧮  \n/define  ⇒ Dictionary word definitions 📚  \n/Bible  ⇒ Fetch Bible verses ✝️\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, {
      chat_id : chatId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: [
          [{text: '🔙 𝗕𝗮𝗰𝗸',callback_data: 'helpPage'}]
        ]
      }
    });
  }else if (data === 'fun'){
    bot.editMessageText(`\n/joke  ⇒ Sends a random joke 😂  \n/randomoji  ⇒ Sends a random emoji 🎲  \n/img  ⇒ Generate AI images 🖼️  \n/tokfetch  ⇒ Download TikTok video links 🎥\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, 
    {
      chat_id : chatId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: [
          [{text: '🔙 𝗕𝗮𝗰𝗸',callback_data: 'helpPage'}]
        ]
      }
    });
  }



  if(data === 'helpPage'){
    bot.editMessageText(`🤖 𝗔𝗹𝗹-𝗶𝗻-𝗢𝗻𝗲 𝗕𝗼𝘁 𝗠𝗲𝗻𝘂\nExplore commands by category: Basics, Fun, Tools, or Data.\n\nTap a button below to begin.\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, 
    {
      chat_id: chatId,
      message_id: msgId,
      reply_markup: {
        inline_keyboard: [
          [{text: '💠 𝗕𝗔𝗦𝗜𝗖',callback_data: 'basic'},{text: '📊 𝗗𝗔𝗧𝗔',callback_data: 'data'}] ,
          [{text: '🎭 𝗙𝗨𝗡', callback_data: 'fun'},{text: '🛠️ 𝗧𝗢𝗢𝗟𝗦', callback_data: 'tools'}]
        ]
      }
    });
  }


  bot.answerCallbackQuery(queryId);
})


//projects mine
bot.on('message' , async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);

  

  if(!userMsg || chatType === 'channel' || !isMember) return;
  if(userMsg === '/whaspy' || userMsg === '/whaspy @oligogram_bot'){
    const message = '🔹 WHASPY\n\n👤 View any WhatsApp profile picture by number.\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '🔍 𝗩𝗶𝗲𝘄 𝗪𝗵𝗮𝘀𝗽𝘆', url: 'https://whaspy.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/qalc' || userMsg === '/qalc@oligogram_bot'){
    const message = '🔹 QALCULATOR\n\n🧮 Minimal, fast math calculator — no distractions.\n\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '🧮 𝗧𝗿𝘆 𝗤𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥', url: 'https://qalculator.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/bot' || userMsg === '/bot@oligogram_bot'){
    const message = '🔹 OLIGOBOT\n\n🤖 Smart AI chatbot , ask anything, get answers.\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '💬 𝗖𝗵𝗮𝘁 𝘄𝗶𝘁𝗵 𝗢𝗟𝗜𝗚𝗢𝗕𝗢𝗧', url: 'https://oligo-bot.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/pgen' || userMsg === '/pgen@oligogram_bot'){
    const message = '🔹 PGEN\n\n🔐 Generate strong passwords by length.\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '🔐 𝗧𝗿𝘆 𝗣𝗚𝗲𝗻', url: 'https://pgen-one.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/tokfetch' || userMsg === '/tokfetch@oligogram_bot'){
    const message = '🔹 PGEN\n\n🎬 Download TikTok videos/audio with or without watermark.\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '🎬 𝗨𝘀𝗲 𝗧𝗼𝗸𝗙𝗲𝘁𝗰𝗵', url: 'https://tokfetch.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/convert' || userMsg === '/convert@oligogram_bot'){
    const message = '🔹 Monexia\n\n💱 Convert currencies fast, anytime, anywhere.\n🔧 Developed by 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '💲♻️ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝘄𝗶𝘁𝗵 𝗠𝗼𝗻𝗲𝘅𝗶𝗮', url: 'https://monexia.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }else if(userMsg === '/randomoji' || userMsg === '/randomoji@oligogram_bot'){
    const message = '🔹 RandoMoji\n\n🎲 Tap to get totally random emojis — endless fun.\n🔧 Developed by Joseph 𝗝𝗼𝘀𝗲𝗽𝗵 𝗕𝗼𝗻𝘀𝘂 🇬🇭';
    const button = {
      reply_markup: {
        inline_keyboard:[
          [
            {text: '🔍 🎲 𝗚𝗲𝘁 𝗥𝗮𝗻𝗱𝗼𝗠𝗼𝗷𝗶', url: 'https://randomoji-two.vercel.app/'}
          ]
        ]
      }
    };
    bot.sendMessage(chatId, message, button);
  }
});

//dictionary
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);

  
  if(!userMsg || chatType === 'channel' || !isMember) return;
  if(userMsg === '/define' || userMsg === '/define@oligogram_bot'){
  bot.sendMessage(chatId,  `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n /define <word> \n║ e.g Oligo\n\n 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`);
  }else if(userMsg.startsWith('/define ')){
    const word = userMsg.slice(8).trim();
    if(!word){
      return bot.sendMessage(chatId,  `Word not found 🚫`)
    }
    
    try{
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const data = res.data;
      
      allDefs = [];
      emojis =  ['📚','📕','📗','📙','💡','📝'];
      e = emojis[Math.floor(Math.random()*emojis.length)];
      
      data.forEach( datum => {
        datum.meanings.forEach(dam => {
           dam.definitions.forEach(def => {
           allDefs.push(`${e}-●-${def.definition}`)
      })
  })
})

      if(allDefs.length === 0){
        return bot.sendMessage(chatId,  `Sorry 😔, no definitions found 🗒`)
      }

      const finalMessage = `📖 *Definition of "${word}*"\n\n` + allDefs.join('\n\n') + `\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`; 
      bot.sendMessage(chatId,  finalMessage,  {parse_mode: 'Markdown'})

    }catch(err){
      console.log('Error: ', err);
      bot.sendMessage(chatId,  `❌️ Word not found , Please try another word`)
    }
  }
  
});


//bible
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);

  
if(!userMsg || chatType === 'channel' || !isMember) return;
if(userMsg === '/Bible' || userMsg === '/Bible@oligogram_bot'){
  bot.sendMessage(chatId,  `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n /Bible (Book Chapter:Verse)\n║  e.g John 3:16\n\n 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`);
 }else if (userMsg.startsWith('/Bible ')) {
    const verse = userMsg.slice(7).trim(); // e.g., 'john 3:16'
    try{
    const response = await axios.get(`https://bible-api.com/${encodeURIComponent(verse)}?translation=kjv`);
    const data = response.data;
    if(data || data.verses){
       const verseText = `📖 *${data.reference}*\n\n_${data.text}_\n\n 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`
       bot.sendMessage(chatId, verseText, {parse_mode: 'Markdown'});
     } else {
       bot.sendMessage(chatId, "Sorry, I couldn't find that verse.");
    }
    }catch(e){
        bot.sendMessage(chatId, "⚠️ An error occurred while fetching the scripture");
        console.error("Error ", e);
    };
    }
});


//image generation
bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const userMsg = msg.text;
   const chatType = msg.chat.type;
   const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);


   if (!userMsg || (chatType === 'channel') || !isMember) return; 
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

       bot.sendPhoto(chatId, imageUrl, {caption: `║ 📸 Here is your ${imageName} image\n║ 🔅 *Image by* : ${author}\\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, parse_mode: 'Markdown'});
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

//qr codes
bot.on('message' , async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const msgId = msg.message_id;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);


  if (!userMsg || (chatType === 'channel') || !isMember) return; 
  if(userMsg === '/qr' || userMsg === "/qr@oligogram_bot"){
    bot.sendMessage(chatId,  `╔⫷⫷⫷[👑 COMMAND INFO ]⫸⫸⫸◆\n║\n  👨‍💻 Type /qr <anytext>\n║   (eg. /qr OligoCodes)\n\n  📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`)
  }else if(userMsg.startsWith('/qr ')){
    const text = userMsg.slice(4);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=300x300`;
      
    bot.sendPhoto(chatId, qrUrl, {caption: `║ 🔳 Your QR code is ready\n\n📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭`, reply_to_message_id: msgId}).catch(error => {
      console.error('Error ', error.message);
      bot.sendMessage(chatId,  `🚫 Could not generate QR Code.`)
    })
  }
});


//jokes
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const msgId = msg.message_id;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);


  if (!userMsg || (chatType === 'channel') || !isMember) return; 
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

      bot.sendMessage(chatId, `Preparing *${type.toUpperCase()}* joke 😃 ...`, {parse_mode : 'Markdown'});
      bot.sendMessage(chatId, `        🤡 𝗝𝗢𝗞𝗘 𝗣𝗨𝗟𝗦𝗘\n\n*${setup}*...\n\n ${jokeEmoji} ${joke} ${jokeEmoji}\n\n 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭 ` , {parse_mode: 'Markdown' , reply_to_message_id : msgId});
      bot.sendSticker(chatId, `${stickerId}`);
        
      }catch(e){
         console.error("Error ", e)
         bot.sendMessage(chatId, "🥶 Joke not found",  {reply_to_message_id: msgId})
       }
      }
});


//weather
bot.on('message' , async (msg) => {
  const chatId = msg.chat.id;
  const userMsg = msg.text;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);



  if (!userMsg || (chatType === 'channel') || !isMember) return; 
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

       const message = `<b>╔⫷⫷⫷[👑 WEATHER INFO ]⫸⫸⫸</b><b>\n║\n║ 🌤️ Weather in ${location}, ${country}</b><b>\n║ 🌡️ Temperature:</b> ${temp}°C<b>\n║ 🤗 Feels Like:</b> ${feels}°C<b>\n║ 💧 Humidity:</b> ${humidity}%<b>\n║ 🌬️ Wind Speed:</b> ${wind} m/s<b>\n║ ☁️ Condition:</b> ${condition}<b>\n║</b><b>\n║\n║ 📡 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗢𝗹𝗶𝗴𝗼𝗧𝗲𝗰𝗵 🇬🇭 </b>`;
       const viewIconButton = {
         parse_mode: 'HTML',
         reply_markup:{
           inline_keyboard: [
             [{text: "🖼️ View Icon", url: `${iconUrl}`}]
           ]
         }
       };
       bot.sendMessage(chatId, message, viewIconButton);

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

  if (data === "/btc") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of BITCOIN💰 is\n   ❂⊣ $${res.data.bitcoin.usd} ⊢❂`);
    } catch (e) {
      console.error("BTC error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 💰`);
    }

  } else if (data === "/eth") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of ETHEREUM 🧠 is\n   ❂⊣ $${res.data.ethereum.usd} ⊢❂`);
    } catch (e) {
      console.error("ETH error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🧠`);
    }

  } else if (data === "/sol") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of SOLANA 🔮 is\n   ❂⊣ $${res.data.solana.usd} ⊢❂`);
    } catch (e) {
      console.error("SOL error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🔮`);
    }

  } else if (data === "/bnb") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of BINANCE COIN 🪙 is\n   ❂⊣ $${res.data.binancecoin.usd} ⊢❂`);
    } catch (e) {
      console.error("BNB error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 🪙`);
    }

  } else if (data === "/ada") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of CARDANO 💢 is\n   ❂⊣ $${res.data.cardano.usd} ⊢❂`);
    } catch (e) {
      console.error("ADA error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 💢`);
    }

  } else if (data === "/xrp") {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`);
      bot.sendMessage(chatId, `✅️ The current price of RIPPLE 💠 is\n   ❂⊣ $${res.data.ripple.usd} ⊢❂`);
    } catch (e) {
      console.error("XRP error:", e);
      bot.sendMessage(chatId, `🚫Failed to fetch crypto 💠`);
    }

  } else {
    // It's a different callback unrelated to crypto — ignore or handle it elsewhere.
    console.log("Callback received but not a crypto command:", data);
  }
});

//autoReact

bot.on('message' , async(msg) => {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;
  const chatType = msg.chat.type;
  const userId = msg.from.id;
  const checkMembership = async (userId) => {
  try {
    const res = await bot.getChatMember(oligoTechChannel, userId);
    const status = res.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error("Error checking membership:", error);
    return false; // Assume not a member on error
  }
};
  const isMember = await checkMembership(userId);

  
  if(msg.from?.is_bot ||!isMember) return;
  try{
    const response = await axios.post(`https://api.telegram.org/bot${token}/setMessageReaction` , {
      chat_id: chatId,
      message_id: msgId,
      reaction: [{type: 'emoji' , emoji: '👑'}]
    });  
    
    console.log(response.data)
  }catch(err){
    console.error('Failed to react ', err.message , err.response?.data)
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

