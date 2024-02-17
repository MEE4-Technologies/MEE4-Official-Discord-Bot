const { Client, Interaction, EmbedBuilder } = require("discord.js");
const User = require("../../models/User");
const rouletteAmount = [100, 500, 50, -100, -300];

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

      const spinEmbed = new EmbedBuilder()
        .setTitle("Roulette Is Spinning...")
        .setImage("https://media1.tenor.com/m/A2DlRFtGcmMAAAAC/rulet.gif");
      interaction.editReply({ embeds: [spinEmbed] });

      // generate a random number from the array rouletteAmount
      const spinResult = rouletteAmount[Math.floor(Math.random() * rouletteAmount.length)];

      // update the user's balance in the database
      user.balance += spinResult;
      await user.save().catch((err) => console.log(`Error while saving the user document: ` + err));

      const spinsuccessEmbed = new EmbedBuilder()
        .setTitle("Roulette")
        .setDescription(`🎖️ ${interaction.user} you got **${spinResult} 💎 on the roulette!**`);
      interaction.followUp({ embeds: [spinsuccessEmbed] });
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  },

  name: "roulette",
  description: "Spin the roulette wheel and see what's inside!",
};