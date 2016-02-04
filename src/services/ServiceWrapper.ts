import * as axios from 'axios'
import {store} from '../store/configureStore'

/**
 * This class wraps JWT authentication logic
 */
export default class ServiceWrapper {

  constructor(
    public apiKey?: string,
    public url?: string
  ) {

    Object.defineProperty(this, 'apiKey', {
      get: () => store.getState().identity.token
    })

    this.url = __config__.apiUrl
  }

  get(url, query?) {
    return axios.get(`${this.url}/${url}`, {
      params: query,
      headers: {
        Authorization: this.apiKey
      }
    })
  }

  post(url, data, query?) {
    return axios.post(`${this.url}/${url}`, {
      params: query,
      headers: {
        Authorization: this.apiKey
      },
      data: data
    })
  }
}
