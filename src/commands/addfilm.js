/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Collection,
  CommandInteraction,
  EmbedBuilder
} from 'discord.js'
import {
  Command
} from '../structures/commands.js'

export default new Command({
  name: 'addfilm',
  description: 'Ajoute un film à la liste des films',
  options: [{
    name: 'nom',
    description: 'Le nom du film.',
    type: 3,
    required: true,
    min_value: 1,
    max_value: 100
  },
  {
    name: 'description',
    description: 'La description du film',
    type: 3,
    required: true,
    min_value: 1,
    max_value: 100
  },
  {
    name: 'episode',
    description: 'L\'episode de la série',
    type: 4,
    required: true
  },
  {
    name: 'lien',
    description: 'Le lien du film',
    type: 3,
    required: true
  },
  {
    name: 'image',
    description: "L'image du film ( le lien )",
    type: 3,
    required: true
  },
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
  userPermissions: 'ADMINISTRATOR',
  commandCategory: 'FILM',

  /**
     * @param { { commands: Collection, events: Collection } & Client } client
     * @param { CommandInteraction } interaction
     */

  async callback (client, interaction) {
    const film = interaction.options.get('nom').value
    const description = interaction.options.get('description').value
    const image = interaction.options.get('image').value
    const lien = interaction.options.get('lien').value
    const categ = interaction.options.get('categorie').value
    const episode = interaction.options.get('episode').value
    const films = await client.db.get(`films_${interaction.guild.id}`)
    const episodes = films?.find(film => film?.nom === film)
    if (!episodes) {
      client.db.push(`films_${interaction.guild.id}`, {
        nom: film,
        description: description,
        contenu: [{
          episode: episode,
          lien: lien
        }],
        image: image,
        genre: categ
      })
    } else {
      client.db.push(`films_${interaction.guild.id}`, {
        nom: film,
        description: description,
        contenu: [...episodes, {
          episode: episode,
          lien: lien
        }],
        image: image,
        genre: categ
      })
    }
    const embed = new EmbedBuilder()
      .setTitle('🎬・Ajouté avec succès.')
      .setDescription(`🥥・Nom : \`${film}\`\n🧸・Description : ${description}\n🧩・Genre : ${categ}\n🎥・Lien : ${lien}\n⚖️・Episode : ${episode}`)
      .setImage(`${image}`)
      .setColor('Blurple')

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setEmoji('🎬')
          .setStyle(ButtonStyle.Link)
          .setURL(lien)
          .setLabel('Regarder maintenant !')
      )
    const embedd = new EmbedBuilder()
      .setTitle(`🍿・Film ajouté dans \`${categ}\``)
      .setDescription(`Merci à **${interaction.user.username}** d'avoir ajouté ce film !\n> Titre : \`${film}\`\n> Description : ${description}`)
      .setImage(`${image}`)
      .setFooter({
        text: `Ajouté par ${interaction.user.username}`
      })
      .setColor('Blurple')

    interaction.reply({
      ephemeral: true,
      embeds: [embed]
    })
    const logs = await client.db.get(`logs.films_${interaction.guild.id}`)
    interaction.guild.channels.cache.get(logs)?.send({
      embeds: [embedd]
    })
  }
})
