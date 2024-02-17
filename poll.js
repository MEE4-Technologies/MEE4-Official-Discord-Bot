const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: 'poll',
  description: 'Creates a poll.',
  devOnly: true,
  testOnly: false,
  options: [
    { name: "question", description: 'Your Question', type: 3, required: true }, // STRING
    { name: "option1", description: 'Option 1', type: 3, required: true },  // STRING
    { name: "option2", description: 'Option 2', type: 3, required: true } // STRING (MAX 100 CHARACTERS)
  ],
  deleted: false,

  callback: (client, interaction) => {
    const question = interaction.options.getString("question");
    const option1 = interaction.options.getString("option1");
    const option2 = interaction.options.getString("option2");

    if (option1.length > 100) {
      [option1, option2] = [option2, option1];
    }

    if (!option2 || option2.length > 100) {
      return interaction.reply({ content: `Invalid Option! Please provide a valid second option.\nExample: \`/poll What do you think about the new update? Yes/No\`` });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${question}\n\n`)
      .addFields(
        { name: 'Option 1', value: option1, inline: true },
        { name: 'Option 2', value: option2, inline: true },
      )
      .setFooter({ text: `Poll started by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .setColor('#FFA500');

    const btnoption1 = new ButtonBuilder()
      .setLabel('Vote for Option 1')
      .setEmoji('1️⃣')
      .setStyle(ButtonStyle.Link)
      .setURL('https://mee6.xyz/');

    const btnoption2 = new ButtonBuilder(btnoption1)
      .setLabel('Vote for Option 2')
      .setURL('https://mee6.xyz/')
      .setEmoji('2️⃣')
      .setStyle(ButtonStyle.Link);

    interaction.channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents([btnoption1, btnoption2])] });
  },
};
