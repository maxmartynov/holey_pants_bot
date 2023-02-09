import {config} from 'dotenv'
import fs from 'fs'
import cron from 'node-cron'
import {log, randomInt, sleep} from './helpers'
import {PHRASES} from './PHRASES'
import {TG} from './tg'

config()

const tg =
  process.env.TG_TOKEN && process.env.TG_CHATS
    ? new TG(process.env.TG_TOKEN)
    : undefined

const lastBotMsgSentAt = (chatId: string): number => {
  const LAST_MSG_FILENAME = `./.lastmsg__${chatId}`

  if (fs.existsSync(LAST_MSG_FILENAME)) {
    const content = fs.readFileSync(LAST_MSG_FILENAME, 'utf8')
    return parseInt(content || '0')
  }
  return 0
}

const saveLastBotMsgSentAt = (chatId: string, date: number) => {
  const LAST_MSG_FILENAME = `./.lastmsg__${chatId}`
  fs.writeFileSync(LAST_MSG_FILENAME, '' + date)
}

const mainFlow = async () => {
  const chatIds = process.env.TG_CHATS?.split(',') || []

  for (const chatId of chatIds) {
    const lastMsg = await tg?.getLastMessage(chatId)
    if (!lastMsg) continue

    const lastBotMsgDate = lastBotMsgSentAt(chatId)
    if (lastBotMsgDate === 0 && lastMsg.date <= 0) continue
    if (lastMsg.date - lastBotMsgDate < 3 /* sec */) continue

    const phrase = PHRASES[randomInt(0, PHRASES.length - 1)]
    log(`phrase: ${phrase}`)
    const newMsg = await tg?.send(chatId, phrase, true)
    if (newMsg?.date) saveLastBotMsgSentAt(chatId, newMsg?.date)
  }
}

log('Running the app...')
runCronWithDelay(0)
runCronWithDelay(15)
runCronWithDelay(30)
runCronWithDelay(45)

function runCronWithDelay(delaySec: number) {
  // https://crontab.guru
  cron.schedule(
    '* * * * *',
    async () => {
      await sleep(1000 * delaySec)
      mainFlow()
    },
    {runOnInit: false}
  )
}
