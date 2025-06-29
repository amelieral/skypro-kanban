<template>
  <div class="main__content">
    <TaskColumn 
      v-for="(column, index) in columns" 
      :key="index"
      :title="column.title"
      :tasks="column.tasks"
    />
  </div>
</template>

<script>
import TaskColumn from './TaskColumn.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn
  },
  props: {
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>