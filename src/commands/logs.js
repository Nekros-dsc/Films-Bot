/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import {
  Client,
  Collection,
  CommandInteraction,
  EmbedBuilder
} from 'discord.js'
import {
  Command
} from '../structures/commands.js'

export default new Command({
  name: 'logs',
  description: 'Permet de définir le salon des logs.',
  options: [
    {
      type: 1,
      name: 'suggestion',
      description: 'Permet de définir le salon des logs de suggestion',
      options: [
        {
          name: 'logs',
          description: 'Salon des logs.',
          type: 7,
          required: true
        }
      ]
    },
    {
      type: 1,
      name: 'films',
      description: "Permet de définir le salon des logs d'ajout de films/séries",
      options: [
        {
          name: 'logs',
          description: 'Salon des logs.',
          type: 7,
          required: true
        }
      ]
    },
    {
      type: 1,
      name: 'avis',
      description: 'Permet de définir le salon des logs des avis',
      options: [
        {
          name: 'logs',
          description: 'Salon des logs.',
          type: 7,
          required: true
        }
      ]
    }
  ],
  userPermissions: 'ADMINISTRATOR',
  commandCategory: 'FILM',

  /**
         * @param { { commands: Collection, events: Collection } & Client } client
         * @param { CommandInteraction } interaction
         */

  async callback (client, interaction) {
    if (interaction.options.getSubcommand() === 'suggestion') {
      const logs = await client.db.get(`logs.suggestions_${interaction.guild.id}`)
      if (logs === interaction.options.get('logs').channel.id) return interaction.reply({ content: 'Le salon des logs que vous avez indiqué est le même que le salon actuel.', ephemeral: true })
      await client.db.set(`logs.suggestions_${interaction.guild.id}`, interaction.options.get('logs').channel.id)
      await interaction.reply({ content: 'Le salon des logs des suggestions a été mis à jour.', ephemeral: true })
    }
    if (interaction.options.getSubcommand() === 'films') {
      const logs = await client.db.get(`logs.films_${interaction.guild.id}`)
      if (logs === interaction.options.get('logs').channel.id) return interaction.reply({ content: 'Le salon des logs que vous avez indiqué est le même que le salon actuel.', ephemeral: true })
      await client.db.set(`logs.films_${interaction.guild.id}`, interaction.options.get('logs').channel.id)
      await interaction.reply({ content: 'Le salon des logs des films/séries a été mis à jour.', ephemeral: true })
    }
    if (interaction.options.getSubcommand() === 'avis') {
      const logs = await client.db.get(`logs.avis_${interaction.guild.id}`)
      if (logs === interaction.options.get('logs').channel.id) return interaction.reply({ content: 'Le salon des logs que vous avez indiqué est le même que le salon actuel.', ephemeral: true })
      await client.db.set(`logs.avis_${interaction.guild.id}`, interaction.options.get('logs').channel.id)
      await interaction.reply({ content: 'Le salon des logs des avis a été mis à jour.', ephemeral: true })
    }
  }
})
