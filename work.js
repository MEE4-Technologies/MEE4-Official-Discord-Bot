const { Client, Interaction, EmbedBuilder } = require("discord.js");
const User = require("../../models/User");

const workAmounts = [20, 30, 40]; // Add multiple numbers here

const work = [
  `You helped BotSpark fix bugs and add features to the bot and they gave you **${workAmounts[0]} 💎** in return.`,
  `You helped the police chase down a 5 star wanted criminal and the police gave you **${workAmounts[1]}💎** in return.`,
  `You wrote the weather forcast for the day. It was accurate as usual. And your employer gave you **${workAmounts[2]} 💎** in return!`,
];

const cooldown = 180; // second

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
      await interaction.deferReply();

      const query = {
        userId: interaction.member.id,
        guildId: interaction.guild.id,
      };

      let user = await User.findOne(query);

      if (!user) {
        user = new User(query);
        await user
          .save()
          .catch((err) =>
            console.log(
              `Error while creating the user document for ${interaction.user.tag}: ` +
                err
            )
          );
      }

      const workAmount =
        workAmounts[Math.floor(Math.random() * workAmounts.length)]; // Randomly select a work amount

      const timestampNow = Date.now() / 1000 || 0;
      if (timestampNow - user.workTimestamp < cooldown) {
        const remainingTime = cooldown - (timestampNow - user.workTimestamp);
        return interaction.editReply(
          `You have to wait **${convertTime(
            remainingTime
          )}** before doing more work.`
        );
      } else {
        await User.findOneAndUpdate(query, {
          $inc: { balance: workAmount },
          workTimestamp: timestampNow,
        });
        console.log(
          `${interaction.member.displayName} worked and earned ${workAmount}`
        );
        return interaction.editReply({
          content: "You have worked and earned some money!",
          embeds: [
            new EmbedBuilder().setTitle(
              work[Math.floor(Math.random() * work.length)]
            ),
          ],
        });
      }
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  },
  name: "work",
  description: "Work and earn some money!",
};
