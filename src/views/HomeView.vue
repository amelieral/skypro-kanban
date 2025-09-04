<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <div class="container">
        <div class="main__block">
          <div v-if="loading" class="loading">
            <p>Данные загружаются...</p>
          </div>
          <div v-else>
            <TaskDesk v-if="hasTasks" />
            <div v-else class="no-tasks">
              <div class="no-tasks__content">
                <h3 class="no-tasks__title">Задач нет</h3>
                <p class="no-tasks__text">Создайте первую задачу, чтобы начать работу</p>
                <button class="create-task-btn _hover01" @click="openCreateModal">
                  Создать задачу
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.meta.isModal" class="modal-container">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, provide, inject } from 'vue' 
import { useRouter } from 'vue-router'
import { fetchTasks } from '@/services/api'
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
  },
  setup() {
    const router = useRouter()
    const auth = inject('auth')
    const loading = ref(true)
    const tasks = ref([])
    const error = ref('')

    const columns = ref([
      { id: 1, title: 'Без статуса', status: 'Без статуса', tasks: [] },
      { id: 2, title: 'Нужно сделать', status: 'Нужно сделать', tasks: [] },
      { id: 3, title: 'В работе', status: 'В работе', tasks: [] },
      { id: 4, title: 'Тестирование', status: 'Тестирование', tasks: [] },
      { id: 5, title: 'Готово', status: 'Готово', tasks: [] },
    ])

    const hasTasks = computed(() => tasks.value.length > 0)

    const loadTasks = async () => {
      loading.value = true
      error.value = ''
      try {
        const token = auth.getToken()
        tasks.value = await fetchTasks({ token })

        columns.value.forEach((column) => {
          column.tasks = tasks.value.filter((task) => task.status === column.status)
        })
      } catch (err) {
        console.error('Ошибка загрузки задач:', err)
        error.value = err.message
        if (err.message.includes('авторизация')) {
          auth.removeUser() 
          router.push('/login')
        }
      } finally {
        loading.value = false
      }
    }

    provide('tasksData', {
      tasks,
      loading,
      error,
      columns,
      refreshTasks: loadTasks,
    })

    const openCreateModal = () => {
      router.push('/new-card') 
    }

    onMounted(() => {
      if (!auth.isAuthenticated()) {
        router.push('/login')
        return
      }
      loadTasks()
    })

    return {
      loading,
      hasTasks,
      error,
      openCreateModal,
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
