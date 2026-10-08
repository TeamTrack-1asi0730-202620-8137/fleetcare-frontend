import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export class BaseApi {
  #http

  constructor() {
    this.#http = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  get http() {
    return this.#http
  }
}
