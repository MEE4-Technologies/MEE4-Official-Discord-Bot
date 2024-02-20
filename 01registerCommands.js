const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await client.application.commands.fetch();

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = applicationCommands.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await client.application.commands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await client.application.commands.edit(existingCommand.id, {
            name,
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await client.application.commands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}".`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};