<script setup>
import IconTrash from './icons/IconTrash.vue'
import IconPen from './icons/IconPen.vue'
const props = defineProps({
  task: Object,
  id: String,
  isEdit: Boolean
})

const emit = defineEmits(['update:editTask', 'update:removeTask'])

const edit = () => {
  emit('update:editTask', props.task)
}

const remove = () => {
  emit('update:removeTask', props.task.id)
}
</script>

<template>
  <li class="item-block">
    {{ props.task.text }}
    {{ props.task.crossedText }}
    <div class="manipulate-block">
      <input :id="props.task.id" type="checkbox" />
      <label :for="props.task.id"></label>
      <button
        class="main-button"
        @click="edit"
        :class="{ disabled: props.task.id !== props.id && props.isEdit }"
      >
        <IconPen />
      </button>
      <button
        class="main-button"
        @click="remove"
        :class="{ disabled: props.task.id !== props.id && props.isEdit }"
      >
        <IconTrash />
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '../assets/scss/index.scss';
@include index.task-block;
</style>
