const { Client, Interaction, MessageEmbed, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const canvacord = require('canvacord');
const Level = require('../../models/Level')

module.exports = {
    callback: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'level') {
            // Fetch data for level leaderboard (replace with your logic)
            // const leaderboardData = Level.findOne();
            // const embed = generateLeaderboardEmbed(leaderboardData, 'Level Leaderboard');

            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Error: Under Development")
                .setDescription("This feature is currently under development and will be available soon.")

            // Send the embed to the Discord channel
            interaction.reply({ embeds: [embed], ephemeral: true});
        } else if (subcommand === 'gems') {
            // Fetch data for gems leaderboard (replace with your logic)
            // const leaderboardData = getGemsLeaderboardData();
            // const embed = generateLeaderboardEmbed(leaderboardData, 'Gems Leaderboard');

            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Error: Under Development")
                .setDescription("This feature is currently under development and will be available soon.")

            // Send the embed to the Discord channel
            interaction.reply({ embeds: [embed], ephemeral: true});
        } else {
            await interaction.reply('Unknown subcommand');
        }
    },
    name: 'leaderboard',
    description: 'Displays a leaderboard.',
    options: [
        {
            name: 'level',
            description: 'Shows the level of each member.',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'gems',
            description: 'Shows how many gems each user has.',
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
};

function generateLeaderboardEmbed(leaderboardData, title) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor('#0099ff') // Set the color of the embed
        .setDescription('Top 10 Users'); // Customize the description as needed

    leaderboardData.forEach((user, index) => {
        // Customize the fields based on your data structure
        embed.addField(`#${index + 1} ${user.username}`, `Value: ${user.value}`);
    });

    return embed;
}
