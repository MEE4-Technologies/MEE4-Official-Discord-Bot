const { Client, Interaction, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    callback: async (client, interaction) => {
        const aboutEmbed = new EmbedBuilder()
            .setTitle("🎉 About Me | MEE4")
            .setDescription("What a wonderful time to tell you everything about me! 😆")
            .addFields(
                { name: '__**Basic Information**__', value: 'Before we get started, you need to know the basics about me!'},
                { name: 'Full Name', value: 'MEE4'},
                { name: 'Date of Birth', value: '4.02.2024'},
                { name: 'Birth Place', value: 'Visual Studio Code, Discord, United Kingdom'},
                { name: 'Nationality', value: 'MEE Family'},
                { name: '\u200B', value: '\u200B' },
                { name: '__**Technical Details**__', value: 'Here are some technical details about me!'},
                { name: 'Programming Language', value: 'JavaScript (Node.js)'},
                { name: 'Library', value: 'discord.js'},
                { name: 'Version', value: 'V.0.4'},
                { name: 'Developed By', value: '<@1191033400589553767>'},
            )
            .setColor("#ed1ae6")
            .setFooter({ text: 'Copyright © 2024 - All Rights Reserved'})

        // Send the embed as a response to the interaction
        interaction.reply({ embeds: [aboutEmbed] });
    },
    
    name: 'about',
    description: 'Displays information about the bot.'
};
