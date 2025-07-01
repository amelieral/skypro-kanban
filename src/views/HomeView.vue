<template>
  <div class="wrapper">
    <BaseHeader />
    
    <main class="main">
      <div class="container">
        <div class="main__block">

          <div v-if="isLoading" class="loading">
            <p>Данные загружаются...</p>
          </div>

          <TaskDesk v-else :columns="columns" />
        </div>
      </div>
    </main>

    <TaskModal />
    <NewCardModal />
    <ExitModal />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
      columns
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

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>

