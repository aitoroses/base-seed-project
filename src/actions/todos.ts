/*
 * Action Types
 */

import { ADD_TODO } from '../constants/Todos.ts'

/*
 * Action Creators
 */

export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}
