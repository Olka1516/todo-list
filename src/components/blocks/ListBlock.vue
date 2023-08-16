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
  (newTasks) => {
    tasks.value = newTasks

    const lastIndex = newTasks.length - 1

    if (lastIndex < 0) {
      index.value = 0
      arrayOfIndex.value = [0, 1, 2]
    } else {
      if (lastIndex < index.value) {
        index.value = Math.max(0, lastIndex)
      } else if (lastIndex - 1 === index.value) {
        arrayOfIndex.value = [index.value - 1, index.value, index.value + 1]
      } else {
        index.value = Math.min(index.value, lastIndex)
        arrayOfIndex.value = [
          Math.max(0, index.value - 2),
          Math.max(1, index.value - 1),
          Math.max(2, index.value)
        ]
      }
    }
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
        <button class="pagination-button" @click="prev" :class="{ notActiveButton: 0 === index }">
          <IconArrowPrev />
        </button>
        <button
          type="button"
          class="pagination-button"
          v-for="i in arrayOfIndex"
          :key="i"
          @click="currentPage(i)"
          :class="{ none: !tasks[i] }"
        >
          <h4 :class="{ notActive: i !== index }">{{ i + 1 }}</h4>
        </button>
        <button
          class="pagination-button"
          @click="next"
          :class="{ notActiveButton: tasks.length - 1 === index }"
        >
          <IconArrowNext />
        </button>
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
