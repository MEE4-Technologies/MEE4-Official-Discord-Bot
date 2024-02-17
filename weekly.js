const { Client, Interaction, EmbedBuilder } = require("discord.js");
const weeklyAmount = 300;
const User = require("../../models/User");

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "❌ You can only run this command in a server!",
        ephemeral: true,
      });
      return;
    }

    try {
      if (interaction.replied) return; // Check if already replied

      await interaction.deferReply();

      const query = {
        userId: interaction.member.id,
        guildId: interaction.guild.id,
      };

      const filter = { lastClaimedWeekly: { $ne: new Date().toDateString() } };
      const update = {
        $inc: { balance: weeklyAmount },
        $set: { lastClaimedWeekly: new Date() },
      };
      const options = { new: true, upsert: true, returnOriginal: false };

      let user = await User.findOneAndUpdate(query, update, options);

      if (!user) {
        user = new User({
          ...query,
          lastClaimedWeekly: new Date(),
        });
      }

      const currentDate = new Date().toDateString();
      if (user.lastClaimedWeekly.toDateString() === currentDate) {
        const embed = new EmbedBuilder()
          .setTitle("You have already collected your gift for this week. Come back next week!");
        return interaction.editReply({ embeds: [embed] });
      }

      const weeklyembed = new EmbedBuilder()
        .setTitle(
          `${weeklyAmount}💎 was added to your balance. Your new balance is ${user.balance}💎.`
        );

      interaction.editReply({ embeds: [weeklyembed] });
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  },

  name: "weekly",
  description: "Claim your weekly gift!",
};