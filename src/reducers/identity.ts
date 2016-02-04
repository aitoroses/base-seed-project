import {decodeToken, JWT} from 'bss-hw-api'
import { SET_TOKEN, REMOVE_TOKEN } from '../constants/Identity'

const LOGIN_TOKEN_STORAGE = 'LOGIN_TOKEN_STORAGE' /* Agreement */

let tokenStorage = localStorage.getItem(LOGIN_TOKEN_STORAGE)
let token = localStorage.getItem(tokenStorage);

export default function auth(state = { token: token }, action?) {

  switch (action.type) {

    case SET_TOKEN:
      localStorage.setItem(tokenStorage, action.token)
      return Object.assign({}, state, { token: action.token })

    case REMOVE_TOKEN:
      localStorage.removeItem(tokenStorage)
      return Object.assign({}, state, { token: null })

    default:
      return state
  }
}

export function getJWT(state): JWT {
  try {
    return decodeToken(state.identity.token)
  } catch(e) {
    return null
  }
}

export function getLoggedUser(state): string {
  try {
    return getJWT(state).sub
  } catch(e) {
    console.warn(e)
    return 'anonymous'
  }
}

export function getUserLanguage(state): string {
  try {
    return getJWT(state).locale
  } catch(e) {
    return null
  }
}

export function getWorkflowContext(state): string {
  try {
    return getJWT(state).workflowContext
  } catch(e) {
    return null
  }
}
