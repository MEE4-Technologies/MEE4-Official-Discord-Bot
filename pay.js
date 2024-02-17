const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../models/User");

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "❌ This command can only be executed in a server!",
        ephemeral: true,
      });
      return;
    }

    const targetUser = interaction.options.getUser("target-user");
    const amount = interaction.options.getNumber("amount");

    if (amount > 100) {
      interaction.reply({
        content: "❌ Donation Amount MUST be under 100 💎!",
        ephemeral: true,
      });
      return;
    }

    async function processDonation(interaction, targetUser) {
      if (targetUser.id === interaction.member.id) {
        await interaction.reply({
          content: "❌ You cannot donate to yourself!",
          ephemeral: true,
        });
        return;
      }

      let user = await User.findOne({ userId: interaction.member.id });

      if (!user) {
        user = new User({ userID: interaction.member.id });
        await user.save();
      }

      const embed = new EmbedBuilder()
        .setColor('#ff7432')
        .setAuthor({ name: `${interaction.user.tag} donated to ${targetUser.tag}`});

      // Add the donation amount to the target user's balance
      const targetUserData = await User.findOne({ userId: targetUser.id });
      if (!targetUserData) {
        const newUser = new User({ userID: targetUser.id });
        newUser.balance += amount;
        await newUser.save();
      } else {
        targetUserData.balance += amount;
        await targetUserData.save();
      }

      // Subtract the donation amount from the donor's balance
      user.balance -= amount;
      await user.save();

      interaction.reply({ embeds: [embed] });
    }

    processDonation(interaction, targetUser);
  },
  name: "pay",
  description: "Transfer currency to another user.",
  options: [
    {
      name: "target-user",
      description: "The user you want to pay.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "amount",
      description: "The amount you want to pay the user.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};