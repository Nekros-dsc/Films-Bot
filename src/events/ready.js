import { Evenement } from '../structures/evenements.js'
import chalk from 'chalk'
import {
  REST
} from '@discordjs/rest'
import {
  Routes
} from 'discord-api-types/v9'

export default new Evenement(
  {
    eventName: { ready: 0 },

    /**
         * @param { { commands: Collection, events: Collection } & Client } client
        */

    async callback (client) {
      console.log(chalk.blue('Prêt sur ') + chalk.red(`${client.user.tag}`))
      const rest = new REST({
        version: '10'
      }).setToken(client.token);
      (async () => {
        try {
          const commands = []
          client.commands.forEach(commandOptions => {
            commands.push(commandOptions)
          })
          client.guilds.cache.forEach(async guild => {
            await rest.put(
              Routes.applicationGuildCommands(client.user.id, guild.id), {
                body: commands
              }
            )
          })
        } catch (error) {
          console.error(error)
        }
      })()
      process.on('unhandledRejection', async (err) => {
        return console.log(err)
      })
      process.on('uncaughtException', async (err) => {
        return console.log(err)
      })
    }
  }
)
