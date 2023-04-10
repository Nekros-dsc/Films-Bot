import { ExtandedClient } from './src/structures/client.js'
import { readFileSync } from 'fs'

export const EXTANDED_CLIENT = new ExtandedClient(
  {
    eventDir: '../events/',
    commandDir: '../commands/',
    clientToken: JSON.parse(readFileSync('./config.json', 'utf-8')).clientToken,
    clientOptions: { intents: 3276799, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }
  }
)