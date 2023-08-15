<script setup>
import { ref, onMounted, watch } from 'vue'
import InputBlock from './components/InputBlock.vue'
import ListBlock from './components/ListBlock.vue'
import { todosStore } from './stores'
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
  <img src="./assets/pictues/background.jpg" class="image-bg" alt="" />
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
      @update:editTask="(task) => editTask(task)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/index.scss';
@include index.wrapper;
</style>
