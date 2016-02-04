/**************************************************************************
 * Root reducer                                                           *
 *                                                                        *
 * We will pass to our store just one reducer to handle all the state     *
 * by combining all the reducers                                          *
 *                                                                        *
 * routerStateReducer will provide to the store the routers state so that *
 * we are able to extract it from the store                               *
 **************************************************************************/

import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

// Import reducers
import todos from './todos'
import identity from './identity'


const rootReducer = combineReducers({
  todos,
  identity,
	router: routerStateReducer
})

export default rootReducer
