import axios, {AxiosError, AxiosInstance} from 'axios'
import {stringify} from 'querystring'
import {log} from './helpers'

export class TG {
  private client: AxiosInstance | undefined

  constructor(private token: string) {
    this.client = axios.create({
      baseURL: 'https://api.telegram.org',
    })
  }

  // TODO: could be improved to get a real text message from the chat
  async getLastMessage(chat_id: string) {
    if (!this.client) {
      throw new Error('Axios does not initialized')
    }
    try {
      const res = await this.client.post(
        `/bot${this.token}/getUpdates?offset=-1&limit=1`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      )
      const msgs = res.data.result || []
      const msg = msgs[0]?.message || msgs[0]?.edited_message
      return msg as {date: number}
    } catch (e: AxiosError | any) {
      log(e.message)
      log(e.response?.data)
    }
  }

  async send(chat_id: string, message: string, silent: boolean = false) {
    if (!this.client) {
      throw new Error('Axios does not initialized')
    }
    try {
      const res = await this.client.post(
        `/bot${this.token}/sendMessage`,
        stringify({chat_id, text: message, disable_notification: silent}),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      )
      const msg = res.data.result
      return msg as {date: number}
    } catch (e: AxiosError | any) {
      log(e.message)
      log(e.response?.data)
    }
  }
}
