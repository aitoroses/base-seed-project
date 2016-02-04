
import * as React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import * as axios from 'axios'

import * as todoActions from '../actions/todos'
import TodoApp from '../components/TodoApp'

// State selector
const mapStateToProps = createSelector(
  state => state.router,
  state => state.todos,
  (router, todos) => ({router, todos})
)

export interface IProps {
  dispatch: any
  todos: string[]
}

@connect(mapStateToProps)
class HelloWorld extends React.Component<IProps, any> {

  // Actions need to be a member of the clase
  // (Note that this is typescript specific)
  private actions: typeof todoActions

  constructor(props) {
    super()
    this.actions = bindActionCreators(todoActions, props.dispatch)
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value})
  }

  render() {
    return (
      <TodoApp
        todos={this.props.todos}
        onAddTodo={this.actions.addTodo}
      />
    )
  }
}

export default HelloWorld
