<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <TaskModal v-else-if="task" :task="task" />
    <div v-else-if="!loading && !task" class="error">Задача не найдена</div>
    <div v-else style="display: none"></div>
  </div>
</template>

<script>
import TaskModal from '@/components/TaskModal.vue'
import { getTasksById } from '@/services/api'
import { getValidToken } from '@/services/auth.js'

export default {
  name: 'CardView',
  components: { TaskModal },
  data() {
    return {
      task: null,
      loading: true,
      error: null,
    }
  },
  async mounted() {
    await this.loadTask()
  },
  watch: {
    '$route.params.id': {
      handler: 'loadTask',
      immediate: false,
    },
  },
  methods: {
    async loadTask() {
      try {
        this.loading = true
        this.error = null
        this.task = null

        const taskId = this.$route.params.id
        if (!taskId) {
          throw new Error('ID задачи не указан')
        }

        const token = getValidToken()
        const response = await getTasksById({ token, id: taskId })

        if (response && response.task) {
          this.task = response.task
        } else {
          throw new Error('Задача не найдена в ответе API')
        }
      } catch (error) {
        console.error('Ошибка загрузки задачи:', error)
        this.error = error.message || 'Произошла ошибка при загрузке задачи'
      } finally {
        this.loading = false
      }
    },
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
