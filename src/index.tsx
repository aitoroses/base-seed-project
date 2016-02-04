//////////////////
// Dependencies //
//////////////////

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Router from 'react-router'
const { Route, NotFoundRoute } = Router
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

// React components for Redux DevTools
import DevTools from './containers/DevTools'

///////////////////////
// Components import //
///////////////////////

// -- Import components --
import AuthHandler from './containers/AuthHandler'
import HelloWorld from './containers/HelloWorld'

///////////
// Store //
///////////

import {store} from './store/configureStore'

/*****************************************************************
 * Root component                                                *
 * Is the top level component, it wraps the application entirely *
 * for rerendering in case of changes in the Redux Store         *
 *                                                               *
 * Here we are defining the application routes.                  *
 *                                                               *
 * The MainHandler is the component that acts as layout for the  *
 * others, passed as children to it.                             *
 *****************************************************************/

class Root extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <div>
        <ReduxRouter>
          <Route component={ AuthHandler }>
            {/* Routes */}
            <Route path="*" component={ HelloWorld } />
          </Route>
        </ReduxRouter>
        <DevTools store={store}/>
        </div>
      </Provider>
    )
  }
}

///////////////////////////
// Application Bootstrap //
///////////////////////////

/***************************************************************************
 * The application render target is the root node in the index.html file   *
 *                                                                         *
 * In case that we are in development mode with DEBUG=true the redux state *
 * monitor will appear also.                                               *
 ***************************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  const target = document.getElementById('root')
  //if (__DEV__) {
    ReactDOM.render(
        <Root />,
      target
    )
})
