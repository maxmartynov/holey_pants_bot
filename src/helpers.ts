import dayjs from 'dayjs'

export const sleep = (ms: number) =>
  new Promise((r) => {
    log(`sleep ${(ms / 60 / 1000).toFixed(1)}min`)
    setTimeout(r, ms)
  })

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const log = (message: any) => {
  console.log(
    `[${dayjs().format('DD/MM/yyyy HH:mm:ss')}]`,
    JSON.stringify(message, null, 2)
  )
}
