<script setup>
import { ref, watch } from 'vue'
import IconArrowPrev from './icons/IconArrowPrev.vue'
import IconArrowNext from './icons/IconArrowNext.vue'
import TaskBlock from './TaskBlock.vue'
const selectedEditTask = ref('')
const isEdit = ref(false)
const tasks = ref([])
const index = ref(0)

const props = defineProps({
  allTasks: Array,
  edit: Boolean
})

tasks.value = props.tasks
isEdit.value = props.edit
const emit = defineEmits(['update:editTask', 'update:removeTask'])

const removeTask = async (id) => {
  emit('update:removeTask', id)
}

const editTask = (task) => {
  emit('update:editTask', task)
  selectedEditTask.value = task
  isEdit.value = true
}

const prev = () => {
  if (index.value === 0) return
  index.value--
}

const next = () => {
  if (index.value == tasks.value.length - 1) return
  index.value++
}
watch(
  () => props.allTasks,
  (data) => {
    tasks.value = data
  }
)
watch(
  () => props.edit,
  (data) => {
    isEdit.value = data
  }
)
</script>

<template>
  <div class="list-block" v-if="tasks && tasks[0]">
    <ul class="task-block">
      <TaskBlock
        v-for="task in tasks[index]"
        :key="task.id"
        :task="task"
        @update:removeTask="(id) => removeTask(id)"
        @update:editTask="(task) => editTask(task)"
        :id="selectedEditTask.id"
        :isEdit="isEdit"
      />
    </ul>
    <div v-if="tasks.length > 1" class="pagination">
      <button class="pagination-button" @click="prev"><IconArrowPrev /></button>
      <h4>{{ index + 1 }}</h4>
      <button class="pagination-button" @click="next"><IconArrowNext /></button>
    </div>
  </div>
  <div v-else class="list-block no-task-block">
    <h2>You dont have any tasks</h2>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/scss/index.scss';
@include index.list-block;
</style>
