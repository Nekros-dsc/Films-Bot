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
  name: 'catalogue',
  description: 'Permet de voir la liste des films',
  options: [
    {
      name: 'categorie',
      description: 'Veuillez choisir la catégorie du film',
      type: 3,
      required: true,
      choices: [{
        name: 'Comédie',
        value: 'comedie'
      },
      {
        name: 'Histoire',
        value: 'histoire'
      },
      {
        name: 'Science-Fiction',
        value: 'science-fiction'
      },
      {
        name: 'Romance',
        value: 'romance'
      },
      {
        name: 'Thriller',
        value: 'thriller'
      },
      {
        name: 'Cinéma',
        value: 'cinema'
      },
      {
        name: 'Drame',
        value: 'drame'
      },
      {
        name: 'Horreur',
        value: 'horreur'
      },
      {
        name: 'Guerre',
        value: 'guerre'
      },
      {
        name: 'Action',
        value: 'action'
      },
      {
        name: 'Anime',
        value: 'anime'
      },
      {
        name: 'Super-Héros',
        value: 'super-heros'
      },
      {
        name: 'Animation',
        value: 'animation'
      },
      {
        name: 'Fantaisie',
        value: 'fantaisie'
      }
      ]
    }
  ],
  userPermissions: 'EVERYONE',
  commandCategory: 'FILM',

  /**
       * @param { { commands: Collection, events: Collection } & Client } client
       * @param { CommandInteraction } interaction
       */

  async callback (client, interaction) {
    const films = await client.db.get(`films_${interaction.guild.id}`)
    if (!films) return interaction.reply({ content: "Il n'y a aucun film dans ce serveur." })
    const filmsByCategory = films?.filter(film => film?.genre === interaction.options.get('categorie').value)
    const filmsFiltered = filmsByCategory?.map(function (film, i) { return `${i + 1}. **${film?.nom}**` })
    const embed = new EmbedBuilder()
      .setTitle(`Liste des films/séries de la catégorie ${interaction.options.get('categorie').value.toUpperCase()}`)
      .setDescription(filmsFiltered?.join('\n') || 'Aucun film trouvée dans cette catégorie')
      .setColor('Blurple')

    return interaction.reply({ embeds: [embed], ephemeral: true })
  }
})
