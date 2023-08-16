<script setup>
import { ref, watch } from 'vue'
import IconArrowPrev from '../icons/IconArrowPrev.vue'
import IconArrowNext from '../icons/IconArrowNext.vue'
import TaskBlock from './TaskBlock.vue'
const selectedEditTask = ref('')
const isEdit = ref(false)
const tasks = ref(undefined)
const index = ref(0)
const arrayOfIndex = ref([0, 1, 2])

const props = defineProps({
  allTasks: Array,
  edit: Boolean
})

tasks.value = props.allTasks
isEdit.value = props.edit
const emit = defineEmits(['update:editTask', 'update:removeTask', 'update:doneTask'])
const removeTask = async (id) => {
  emit('update:removeTask', id)
}

const doneTask = async (task) => {
  emit('update:doneTask', task)
}

const editTask = (task) => {
  emit('update:editTask', task)
  selectedEditTask.value = task
  isEdit.value = true
}

const prev = () => {
  if (index.value <= 0) return
  index.value--
}

const next = () => {
  if (index.value >= tasks.value.length - 1) return
  index.value++
}

const currentPage = (i) => {
  index.value = i
}

watch(
  () => props.allTasks,
  (data, old) => {
    tasks.value = data
    console.log(data, old)
    if (old.length === 0 || (index.value < tasks.value.length - 1 && old.length === data.length))
      return
    if (old.length > data.length) index.value--
    else index.value++
    arrayOfIndex.value[0] = index.value - 2
    arrayOfIndex.value[1] = index.value - 1
    arrayOfIndex.value[2] = index.value
  }
)
watch(
  () => props.edit,
  (data) => {
    isEdit.value = data
  }
)
watch(
  () => index.value,
  () => {
    if (index.value <= 0 || index.value >= tasks.value.length - 1) return
    arrayOfIndex.value[0] = index.value - 1
    arrayOfIndex.value[1] = index.value
    arrayOfIndex.value[2] = index.value + 1
  }
)
</script>

<template>
  <div class="list-block">
    <div v-if="!tasks" class="no-task-block">
      <div class="spinner"></div>
    </div>
    <div v-else-if="tasks && tasks[0]" class="tasks-block">
      <ul class="task-block">
        <TaskBlock
          v-for="task in tasks[index]"
          :key="task.id"
          :task="task"
          @update:removeTask="(id) => removeTask(id)"
          @update:doneTask="(id) => doneTask(id)"
          @update:editTask="(task) => editTask(task)"
          :id="selectedEditTask.id"
          :isEdit="isEdit"
        />
      </ul>
      <div v-if="tasks.length > 1" class="pagination">
        <button class="pagination-button" @click="prev"><IconArrowPrev /></button>
        <button
          type="button"
          class="pagination-button"
          v-for="i in arrayOfIndex"
          :key="i"
          @click="currentPage(i)"
        >
          <h4>{{ i + 1 }}</h4>
        </button>
        <button class="pagination-button" @click="next"><IconArrowNext /></button>
      </div>
    </div>
    <div v-else class="no-task-block">
      <h2>You don`t have any tasks</h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '../../assets/scss/index.scss';
@include index.list-block;
</style>
