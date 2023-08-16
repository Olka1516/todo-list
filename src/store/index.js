import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import {
  getTodos,
  generateNewTask,
  removeTaskById,
  editThisTaskById,
  setTaskIsDoneById
} from '../service'

export const todosStore = defineStore('todos', () => {
  const state = reactive({
    todos: []
  })

  const fetchTasks = async () => {
    state.todos = await getTodos()
  }

  const addNewTask = async (task) => {
    state.todos = await generateNewTask(task)
  }
  const removeTask = async (id) => {
    state.todos = await removeTaskById(id)
  }

  const doneTask = async (task) => {
    await setTaskIsDoneById(task)
  }

  const editToBack = async (task) => {
    await editThisTaskById(task)
  }

  return { ...toRefs(state), fetchTasks, addNewTask, removeTask, editToBack, doneTask }
})
