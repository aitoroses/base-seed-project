import * as React from 'react'

export interface IProps {
  onAddTodo(x: string): void
  todos: string[]
}

class TodoApp extends React.Component<IProps, any> {

  state = {
    inputValue: ''
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value})
  }

  handleTodoAdd() {
    if (this.state.inputValue) {
      this.props.onAddTodo(this.state.inputValue)
      this.setState({inputValue: ''})
    }
  }

  render() {

    const {todos} = this.props

    return (
      <div>
        <h1>Todos</h1>
        <ol>
          {todos.map( (t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
        <input
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}/>
        <button
          onClick={this.handleTodoAdd.bind(this)}>
          Add
        </button>
      </div>
    )
  }
}

export default TodoApp
