<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <TaskModal v-else-if="task" :task="task" />
    <div v-else-if="!loading && !task" class="error">Задача не найдена</div>
    <div v-else style="display: none"></div>
  </div>
</template>

<script>
import { inject, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import TaskModal from '@/components/TaskModal.vue'

export default {
  name: 'CardView',
  components: { TaskModal },
  setup() {
    const tasksData = inject('tasksData')
    const route = useRoute()

    const error = ref(null)
    const loading = tasksData.loading

    const taskId = computed(() => route.params.id)

    const task = computed(() => {
      return tasksData.tasks.value.find((t) => t._id === taskId.value) || null
    })

    const loadTaskIfNeeded = async () => {
      error.value = null
      if (!task.value) {
        await tasksData.refreshTasks()
        if (!tasksData.tasks.value.find((t) => t._id === taskId.value)) {
          error.value = 'Задача не найдена'
        }
      }
    }

    watch(taskId, loadTaskIfNeeded, { immediate: true })

    return { task, error, loading }
  },
}
</script>

<style scoped>
.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
.error {
  color: #ff0000;
}
</style>
