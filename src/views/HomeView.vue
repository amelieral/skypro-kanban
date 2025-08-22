<template>
  <div class="wrapper">
    <BaseHeader />
    <RouterView />

    <main class="main">
      <div class="container">
        <div class="main__block">
          <div v-if="useMockData" class="demo-warning">
            ⚠️ Сервер недоступен. Используются демонстрационные данные.
          </div>

          <div v-if="isLoading" class="loading">
            <p>Данные загружаются...</p>
          </div>

          <div v-else-if="error" class="error">
            <p>Ошибка: {{ error }}</p>
            <button @click="loadTasks" class="retry-btn">Попробовать снова</button>
          </div>

          <template v-else>
            <TaskDesk v-if="hasTasks" :columns="columns" @task-updated="loadTasks" />
            <div v-else class="no-tasks">
              <div class="no-tasks__content">
                <h3 class="no-tasks__title">Задач нет</h3>
                <p class="no-tasks__text">Создайте первую задачу, чтобы начать работу</p>
                <router-link to="/new-card" class="create-task-btn">Создать задачу</router-link>
              </div>
            </div>
          </template>

          <router-view v-slot="{ Component }">
            <component
              :is="Component"
              v-if="$route.meta.isModal"
              @task-created="loadTasks"
              @task-updated="loadTasks"
              @task-deleted="loadTasks"
            />
          </router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { kanbanApi } from '@/services/api'
import { tasks as mockTasks } from '@/mocks/tasks' 
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
  },
  setup() {
    const route = useRoute()
    const isLoading = ref(false)
    const error = ref('')
    const columns = ref([])
    const useMockData = ref(false)

    const hasTasks = computed(() => columns.value.some(column => column.tasks?.length > 0))

    const loadTasks = async () => {
      isLoading.value = true
      error.value = ''

      try {
        const response = await kanbanApi.getTasks()
        const tasks = response.tasks || []
        useMockData.value = false
        processTasks(tasks)
      } catch (err) {
        console.error('Ошибка загрузки задач:', err)

        if (err.message.includes('соединения') || err.message.includes('Failed to fetch')) {
          error.value = '' 
          useMockData.value = true
          processTasks(mockTasks)
        } else {
          error.value = err.message
        }
      } finally {
        isLoading.value = false
      }
    }

    const processTasks = (tasks) => {
      const formattedTasks = tasks.map(task => ({
        ...task,
        _id: task._id || task.id,
        id: task.id || task._id
      }))
      
      columns.value = [
        {
          id: 1,
          title: 'Без статуса',
          tasks: formattedTasks.filter(task => task.status === 'Без статуса'),
        },
        {
          id: 2,
          title: 'Нужно сделать',
          tasks: formattedTasks.filter(task => task.status === 'Нужно сделать'),
        },
        {
          id: 3,
          title: 'В работе',
          tasks: formattedTasks.filter(task => task.status === 'В работе'),
        },
        {
          id: 4,
          title: 'Тестирование',
          tasks: formattedTasks.filter(task => task.status === 'Тестирование'),
        },
        {
          id: 5,
          title: 'Готово',
          tasks: formattedTasks.filter(task => task.status === 'Готово'),
        },
      ]
    }

    watch(() => route.path, (newPath) => {
      if (newPath === '/') {
        loadTasks()
      }
    })

    onMounted(() => {
      loadTasks()
    })

    return {
      isLoading,
      error,
      columns,
      hasTasks,
      loadTasks,
      useMockData
    }
  },
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
  color: #94a6be;
}

.no-tasks {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  animation: fadeIn 0.5s ease;
}

.no-tasks__content {
  text-align: center;
  max-width: 400px;
}

.no-tasks__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.no-tasks__text {
  color: #94a6be;
  font-size: 16px;
  margin-bottom: 20px;
}

.create-task-btn {
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-task-btn:hover {
  background-color: #33399b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
