<template>
  <div>
    <TaskModal :task="task" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { kanbanApi } from '@/services/api'
import TaskModal from '@/components/TaskModal.vue'

export default {
  name: 'CardView',
  components: {
    TaskModal
  },
  setup() {
    const route = useRoute()
    const task = ref({})

    const loadTask = async () => {
      try {
        const response = await kanbanApi.getTaskById(route.params.id)
        task.value = response.task
      } catch (err) {
        console.error('Ошибка загрузки задачи:', err)
        alert('Ошибка загрузки задачи: ' + err.message)
      }
    }

    onMounted(() => {
      loadTask()
    })

    return {
      task
    }
  }
}
</script>
