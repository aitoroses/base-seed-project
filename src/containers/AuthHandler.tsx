import * as React from 'react'
import {RouteHandler, Link} from 'react-router'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/identity'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

const moment = require('moment')

import * as HWUtils from 'bss-hw-api';
// export const HW = new Utils.HumanWorkflow(__config__.apiUrl)

const REDIRECT_TIME = 2000

const taskSelector = createSelector(
  state => state.identity.token,
  (token) => {return {token}}
)

// AuthHandler is the main handler of the router
@connect(taskSelector)
class AuthHandler extends React.Component<any, any> {

  private actions: typeof AuthActions

  constructor(props) {
    super()
    this.actions = bindActionCreators(AuthActions, props.dispatch)
  }

  navigate(route: string) {
    this.props.history.pushState(null, route, null)
  }

  navigateToLogin() {
    window.location.href = LOGIN_REDIRECT || '/login'
  }

  isTokenValid(): boolean {
    // Get token from state
    let token = this.props.token

    // If no token redirect to the /login
    if (!token) {
      return false
    }

    // Check for token expiration
    let jwt = HWUtils.decodeToken(token)
    const expDate = moment.unix(jwt.exp)
    const now = moment(new Date())

    // Is token expired?
    if (expDate.unix() - now.unix() <= 0) {
      return false
    }

    return true
  }

  /**
   * Check always for token expiration to redirect to login
   * in case of not found or token expired
   */
  checkAuth(): boolean {
    let isTokenValid = this.isTokenValid()

    if (!isTokenValid) {
      this.navigateToLogin()
    }

    setTimeout(() => {
      this.checkAuth()
    }, REDIRECT_TIME )

    return isTokenValid
  }

  emitTokenUpdate(action: HWUtils.TokenAction) {
    if (action.type == HWUtils.TOKEN_UPDATED) {
      this.actions.setToken(action.token)
    }
  }

  componentDidMount() {
    // Subscribe to auth tokens from HW API
    //HW.subscribe(this.emitTokenUpdate.bind(this))
    this.checkAuth()
  }

  render() {
    return (
      <div className="auth-handler">
        {this.props.children}
      </div>
    )
  }
}

export default AuthHandler;
