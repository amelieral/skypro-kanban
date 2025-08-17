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
  const taskId = Number(route.params.id); 
  return tasks.find((t) => t.id === taskId) || {
    id: 0,
    title: 'Задача не найдена',
    topic: '',
    status: ''
  };
});
</script>
