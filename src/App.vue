<script setup>
import { ref, onMounted, watch } from 'vue'
import InputBlock from './components/blocks/InputBlock.vue'
import ListBlock from './components/blocks/ListBlock.vue'
import { todosStore } from './store'
const store = todosStore()
const selectedEditTask = ref('')
const isEdit = ref(false)
const tasks = ref([])

const addTask = async (task) => {
  await store.addNewTask(task)
}

const removeTask = async (id) => {
  await store.removeTask(id)
}

const doneTask = async (task) => {
  await store.doneTask(task)
}

const editTask = (task) => {
  selectedEditTask.value = task
  isEdit.value = true
}

const editToBack = (task) => {
  isEdit.value = false
  selectedEditTask.value.text = task
  store.editToBack(selectedEditTask.value)
  selectedEditTask.value = ''
}

watch(
  () => store.todos,
  (data) => {
    tasks.value = data
  }
)
onMounted(async () => {
  await store.fetchTasks()
})
</script>

<template>
  <img src="./assets/pictures/background.jpg" class="image-bg" />
  <div class="wrapper">
    <InputBlock
      @update:addTask="(task) => addTask(task)"
      @update:editToBack="(task) => editToBack(task)"
      :text="selectedEditTask.text"
      :isEdit="isEdit"
    />
    <ListBlock
      :allTasks="tasks"
      :edit="isEdit"
      @update:removeTask="(id) => removeTask(id)"
      @update:doneTask="(task) => doneTask(task)"
      @update:editTask="(task) => editTask(task)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/index.scss';
@include index.wrapper;
</style>
