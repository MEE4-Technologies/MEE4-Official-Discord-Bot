const User = require("../../models/User");
const { Client, Interaction, EmbedBuilder } = require("discord.js");

const dailyAmount = 100;

module.exports = {
  name: "daily",
  description: "Claim your daily gift!",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "You can only run this command in a server!",
        ephemeral: true,
      });
      return;
    }

    try {
      await interaction.deferReply();

      const query = {
        userId: interaction.member.id,
        guildId: interaction.guild.id,
      };

      let user = await User.findOne(query);

      if (!user) {
        // If user is not found, create a new user
        user = new User(query); // Use the query object directly
      } else {
        const lastDailyDate = user.lastDaily.toDateString();
        const currentDate = new Date().toDateString();

        if (lastDailyDate === currentDate) {
          const embed = new EmbedBuilder()
            .setTitle("You have already collected your gift for today. Come back tomorrow!");
          return interaction.editReply({ embeds: [embed] });
        }
      }

      user.balance += dailyAmount;
      user.lastDaily = new Date();
      await user.save();

      const embed = new EmbedBuilder()
        .setTitle(`${dailyAmount}💎 was added to your balance. Your new balance is ${user.balance}💎.`);

      interaction.editReply({ embeds: [embed] });
      return;
    } catch (error) {
      console.error(`There was an error: ${error}`);
      interaction.reply("An error occurred while processing the command. Please try again later.");
    }
  },
};