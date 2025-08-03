<template>
  <div>
    <TaskModal :task="task" />
  </div>
</template>

<script setup>

import TaskModal from '@/components/TaskModal.vue';
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { tasks } from '@/mocks/tasks'

const route = useRoute()

const task = computed(() => {
   return tasks.find((t) => t.id === route.params.id) || {
      name: '',
      translation: '',
   }
})

</script>
