// index.js
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
  ],
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

let status = [
  {
    name: "MEE4 VI",
    type: ActivityType.Playing,
  },
  {
    name: "MEE4 TV",
    type: ActivityType.Watching,
  },
  {
    name: "MEE4 Radio",
    type: ActivityType.Listening,
  },
];

module.exports = { client, status };

client.on("ready", (c) => {
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "<@1203609996844208159>") {
    message.reply(
      `Oh, joy! Another request from my absolute favorite person. 🎉 What delightful task can I assist you with now, esteemed user <@${message.author.id}>? 😏`
    );
  }
});
