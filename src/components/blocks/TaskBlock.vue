<script setup>
import IconTrash from '../icons/IconTrash.vue'
import IconPen from '../icons/IconPen.vue'
import IconCheck from '../icons/IconCheck.vue'
import { ref } from 'vue'
const props = defineProps({
  task: Object,
  id: String,
  isEdit: Boolean
})

const isTextDone = ref(props.task.isTextDone)

const emit = defineEmits(['update:editTask', 'update:removeTask', 'update:doneTask'])

const edit = () => {
  emit('update:editTask', props.task)
}

const remove = () => {
  emit('update:removeTask', props.task.id)
}

const test = () => {
  emit('update:doneTask', props.task)
  isTextDone.value = !isTextDone.value
}
</script>

<template>
  <li
    class="item-block"
    :class="{ crossedText: isTextDone, disabled: props.task.id !== props.id && props.isEdit }"
  >
    {{ props.task.text }}
    <div class="manipulate-block">
      <input :id="props.task.id" type="checkbox" @click="test" />
      <label :for="props.task.id" class="checkbox">
        <IconCheck v-if="isTextDone" />
      </label>
      <button class="main-button" @click="edit">
        <IconPen />
      </button>
      <button class="main-button" @click="remove">
        <IconTrash />
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/index.scss';
@include index.task-block;
</style>
