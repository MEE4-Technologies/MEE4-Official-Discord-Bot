const {
  ApplicationCommandOptionType,
  MessageEmbed,
  EmbedBuilder,
} = require("discord.js");
const { Client, Interaction } = require("discord.js");
const User = require("../../models/User");
const winAmount = 10;

module.exports = {
  callback: async (client, interaction) => {
    // Retrieve the user's choice from the interaction options
    const userChoice = interaction.options.getString("choice").toLowerCase();

    // Define the bot's choices
    const choices = ["rock", "paper", "scissors"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    // Determine the winner
    let result;
    if (userChoice === botChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper") ||
      (userChoice === "rock" && botChoice === "paper")
    ) {
      result = "You Win!";
    } else {
      result = "You Lose!";
    }

    const query = {
      userId: interaction.member.id,
      guildId: interaction.guild.id,
    };

    let user = await User.findOne(query);

    if (result === "You Win!") {
      user.balance += winAmount;
      await user.save();

      // Create an embed to display the result and reward message
      const embed = new EmbedBuilder()
        .setTitle("Rock, Paper, Scissors")
        .addFields(
          { name: "Your Choice", value: userChoice },
          { name: "Bot's Choice", value: botChoice },
          { name: "Result", value: result },
          { name: "Reward", value: `**${winAmount} 💎** added to your balance!` }
        )
        .setColor("#0addf5") // You can customize the color
      // Use setFooterText to set the footer text
        .setFooter({ text: "Congratulations!"});

      // Reply to the interaction with the embed
      await interaction.reply({ embeds: [embed] });
      return;
    }

    // Create an embed to display the result
    const embed = new EmbedBuilder()
      .setTitle("Rock, Paper, Scissors")
      .addFields(
        { name: "Your Choice", value: userChoice },
        { name: "Bot's Choice", value: botChoice },
        { name: "Result", value: result }
      )
      // Use setFooterText to set the footer text
      .setFooter({ text: "10 💎 will be added to your balance if you win."})
      .setColor("#f50add"); // You can customize the color

    // Reply to the interaction with the embed
    await interaction.reply({ embeds: [embed] });
  },

  name: "rps",
  description: "Play a game of Rock, Paper, Scissors with me!",
  options: [
    {
      name: "choice",
      description: "The choice you want to make (rock/paper/scissors)",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Rock",
          value: "rock",
        },
        {
          name: "Paper",
          value: "paper",
        },
        {
          name: "Scissors",
          value: "scissors",
        },
      ],
    },
  ],
};
