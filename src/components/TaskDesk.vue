<template>
  <div class="main__content">
    <TaskColumn 
      v-for="column in columns" 
      :key="column.id"
      :title="column.title"
      :tasks="column.tasks"
    />
  </div>
</template>

<script>
import { inject } from 'vue'
import TaskColumn from '@/components/TaskColumn.vue' 

export default {
  name: 'TaskDesk',
  components: { TaskColumn }, 
  inject: ['tasksData'],
  setup() {
    const { columns, loading, error } = inject('tasksData')

    return {
      columns,
      loading,
      error
    }
  }
}
</script>