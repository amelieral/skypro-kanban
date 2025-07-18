<template>
  <div class="wrapper">
    <BaseHeader />
    
    <main class="main">
      <div class="container">
        <div class="main__block">
          <div v-if="isLoading" class="loading">
            <p>Данные загружаются...</p>
          </div>

          <template v-else>
            <TaskDesk v-if="hasTasks" :columns="columns" />
            <div v-else class="no-tasks">
              <div class="no-tasks__content">
                <h3 class="no-tasks__title">Задач нет</h3>
                <p class="no-tasks__text">Создайте первую задачу, чтобы начать работу</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>

    <TaskModal />
    <NewCardModal ref="newCardModal" />
    <ExitModal />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { tasks } from '@/mocks/tasks';
import BaseHeader from '@/components/BaseHeader.vue';
import TaskDesk from '@/components/TaskDesk.vue';
import TaskModal from '@/components/TaskModal.vue';
import NewCardModal from '@/components/NewCardModal.vue';
import ExitModal from '@/components/ExitModal.vue';

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
    TaskModal,
    NewCardModal,
    ExitModal
  },

  setup() {
    const isLoading = ref(true);
    const columns = ref([]);
    const newCardModal = ref(null);

    const hasTasks = computed(() => {
      return columns.value.some(column => column.tasks?.length > 0);
    });

    const openNewCardModal = () => {
      if (newCardModal.value) {
        newCardModal.value.open();
      }
    };

    onMounted(() => {
      setTimeout(() => {
        columns.value = [
          {
            id: 1,
            title: 'Без статуса',
            tasks: tasks.filter(task => task.status === 'Без статуса')
          },
          {
            id: 2,
            title: 'Нужно сделать',
            tasks: tasks.filter(task => task.status === 'Нужно сделать')
          },
          {
            id: 3,
            title: 'В работе',
            tasks: tasks.filter(task => task.status === 'В работе')
          },
          {
            id: 4,
            title: 'Тестирование',
            tasks: tasks.filter(task => task.status === 'Тестирование')
          },
          {
            id: 5,
            title: 'Готово',
            tasks: tasks.filter(task => task.status === 'Готово')
          }
        ];
        isLoading.value = false;
      }, 2000); 
    });

    return {
      isLoading,
      columns,
      hasTasks,
      newCardModal,
      openNewCardModal
    };
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
  color: #94A6BE;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin: 20px 0;
}

.loading p {
  animation: pulse 1.5s infinite;
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
  margin: 0 auto;
}

.no-tasks__icon {
  width: 80px;
  height: 80px;
  opacity: 0.6;
  margin-bottom: 20px;
}

.no-tasks__title {
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
}

.no-tasks__text {
  color: #94A6BE;
  font-size: 16px;
  margin-bottom: 20px;
}

.no-tasks__button {
  background-color: #565EEF;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.no-tasks__button:hover {
  background-color: #33399b;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
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

