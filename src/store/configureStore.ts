/***************************************************************************************
 * The Store is the object that brings them together.                                  *
 * The store has the following responsibilities:                                       *
 *                                                                                     *
 *   - Holds application state;                                                        *
 *   - Allows access to state via getState();                                          *
 *   - Allows state to be updated via dispatch(action);                                *
 *   - Registers listeners via subscribe(listener).                                    *
 *                                                                                     *
 * It’s important to note that you’ll only have a single store in a Redux application. *
 * When you want to split your data handling logic,                                    *
 * you’ll use reducer composition instead of many stores.                              *
 *                                                                                     *
 * http://rackt.github.io/redux/docs/basics/Store.html                                 *
 ***************************************************************************************/


import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import DevTools from '../containers/DevTools'
const thunkMiddleware = require('redux-thunk')

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

/******************************************************************
 * We will use redux-router to have the router state in the store *
 ******************************************************************/

import { reduxReactRouter } from 'redux-router'

/**
 * In conjunction with redux and react-router we will use a library that handles
 * the history of the browser.
 *
 * History is a JavaScript library that lets you easily manage session history
 * in browsers, testing environments, etc...
 *
 * It abstracts away the differences in these different platforms and provides
 * a minimal API that lets you manage the history stack, navigate,
 * confirm navigation, and persist state between sessions.
 *
 * https://www.npmjs.com/package/history
 *
 * In development mode we will at the moment use the browser history
 * while in production mode we will use hash history
 */
let createHistory = require('history/lib/createHashHistory')

/*
 * Root Reducer for the store
 */
import rootReducer from '../reducers/index'

/**
 * This function creates the store instance that the application will be using
 * Its configured with the following
 *
 *   - Redux DevTools (devtools and monitor)
 *   - Redux Router
 * @param  {any}         initialState - Initial state of the store
 * @return {Redux.Store}              Store instance
 */
function configureStore(initialState?: any): Redux.Store {

  let finalCreateStore: (reducer: Redux.Reducer, state: any) => Redux.Store = compose(

    // Async actions
    applyMiddleware(thunkMiddleware),

    // Router state
    reduxReactRouter({
      createHistory
    }),

    // Provides support for DevTools:
    DevTools.instrument()

    // Lets you write ?debug_session=<name>
    // in address bar to persist debug sessions
    // persistState(getDebugSessionKey())

  )(createStore);

  const store = finalCreateStore(rootReducer, initialState)

  // This logic is for webpack hot-loader
  if (__DEV__ && module.hot) { // React hot development
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

//////////////////////
// Export instance  //
//////////////////////

export const store = configureStore()

// Globally
global.store = store
