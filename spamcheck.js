const { Collection } = require("discord.js");

// Map to store user command timestamps
const userCooldowns = new Collection();

module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) return; // Ignore messages from bots

    const { author, content, guild } = message;
    const userCooldownKey = `${author.id}-${guild.id}`;
    const cooldownThreshold = 600; // 60 seconds (1 minute)
    const maxCommandsInThreshold = 5; // Adjust this value as needed

    // Check if the user has a cooldown
    if (userCooldowns.has(userCooldownKey)) {
      const lastCommandTimestamp = userCooldowns.get(userCooldownKey);
      const elapsedSeconds = (Date.now() - lastCommandTimestamp) / 1000;

      // Check if the user exceeded the command limit within the cooldown threshold
      if (elapsedSeconds < cooldownThreshold) {
        // Apply cooldown
        const cooldownDuration = 600; // 600 seconds (10 minutes)
        userCooldowns.set(userCooldownKey, Date.now() + cooldownDuration * 1000);

        message.reply(
          `Slow down! You're on cooldown for the next ${cooldownDuration / 60} minutes.`
        );
        return;
      }
    }

    // Update or set the user's command timestamp
    userCooldowns.set(userCooldownKey, Date.now());

    // Check if the command starts with /work or /roulette
    if (content.startsWith("/work") || content.startsWith("/roulette")) {
      return;
    }
  },
};