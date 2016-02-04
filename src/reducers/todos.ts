import { ADD_TODO } from '../constants/Todos.ts'

const initialState = ["Something to do"]

export default function todos(todos = initialState, action) {

  switch (action.type) {

    case ADD_TODO:
      return [...todos, action.todo]

    default:
      return todos
  }
}
