<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <TaskItem 
          v-for="(task, index) in tasks" 
          :key="index" 
          :task="task"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './Task.vue'

export default {
  name: 'TaskColumn',
  components: {
    TaskItem
  },
  props: {
    title: String,
    tasks: {
      type: Array,
      default: () => []
    }
  }
}
</script>