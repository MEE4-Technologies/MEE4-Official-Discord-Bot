const { Client, Interaction, MessageEmbed, EmbedBuilder } = require("discord.js");
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "You can only run this command inside a server!",
        ephemeral: true,
      });
      return;
    }

    const targetChannel =
      interaction.options.getChannel("target-channel") || interaction.channel;

    try {
      // Fetch the last deleted message in the target channel
      const messages = await targetChannel.messages.fetch({
        limit: 1,
        before: interaction.id,
      });
      // const deletedMessage = await message.channel.messages.fetch({ id: 'deleted_message_id_here' });
      const deletedMessage = await messages.first();

      if (deletedMessage) {
        // Create an embed to display the deleted message
        const snipeEmbed = new EmbedBuilder()
          .setColor("#ff0000") // You can customize the color
          .setTitle("🕵️‍♂️ Sniped Message")
          .addFields(
            { name: "Author", value: deletedMessage.author.tag, inline: true},
            { name: "Content", value: deletedMessage.content || "*No content*"}
          )
          .setTimestamp(deletedMessage.createdTimestamp);

        // Send the embed as a response to the interaction
        interaction.reply({ embeds: [snipeEmbed] });
      } else {
        interaction.reply("No recently deleted messages found.");
      }
    } catch (error) {
      console.error(`There was an error in sniping a message: ${error}`);
      interaction.reply("An error occurred while trying to snipe a message.");
    }
  },

  name: "snipe",
  description:
    "Displays the last deleted message in the current or specified channel.",
  options: [
    {
      name: "target-channel",
      description:
        "The target channel to snipe from. If not provided, it will use the current channel.",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],
  devOnly: true,
  testOnly: false,
  botPermissions: [PermissionFlagsBits.ReadMessageHistory],
};
