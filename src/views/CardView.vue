<template>
  <div>
    <TaskModal :task="task" />
  </div>
</template>

<script>
import TaskModal from '@/components/TaskModal.vue';

export default {
  name: 'CardView',
  components: { TaskModal }
};
</script>