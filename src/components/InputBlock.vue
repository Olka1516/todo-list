<script setup>
import IconPlus from './icons/IconPlus.vue'
import IconCheck from './icons/IconCheck.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  text: String,
  isEdit: Boolean
})

const task = ref(props.text)
const isEdit = ref(props.isEdit)
const emit = defineEmits(['update:addTask', 'update:editToBack'])

const addTask = () => {
  if (task.value.trim() === '') return
  emit('update:addTask', task.value)
  task.value = ''
}

const editToBack = () => {
  if (task.value.trim() === '') return
  emit('update:editToBack', task.value)
  task.value = ''
}

watch(
  () => props.text,
  (data) => {
    task.value = data
  }
)
watch(
  () => props.isEdit,
  (data) => {
    isEdit.value = data
  }
)
</script>

<template>
  <div class="add-block">
    <input class="add-input" v-model="task" type="text" placeholder="Write task here" />
    <button v-if="!isEdit" class="main-button" @click="addTask">
      <IconPlus />
    </button>
    <button v-else class="main-button" @click="editToBack">
      <IconCheck />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/index.scss';
@include index.input-block;
</style>
