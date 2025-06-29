<template>
  <div class="wrapper">
    <BaseHeader />
    
    <main class="main">
      <div class="container">
        <div class="main__block">
          <TaskDesk :columns="columns" />
        </div>
      </div>
    </main>

    <TaskModal />
    <NewCardModal />
    <ExitModal />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import TaskModal from '@/components/TaskModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import ExitModal from '@/components/ExitModal.vue'

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
    TaskModal,
    NewCardModal,
    ExitModal
  },
data() {
    return {
      columns: [
        {
          title: 'Без статуса',
          tasks: [
            {
              theme: 'orange',
              category: 'Web Design',
              title: 'Название задачи',
              date: '30.10.23'
            },
            {
              theme: 'green',
              category: 'Research',
              title: 'Название задачи',
              date: '01.11.23'
            },
            {
              theme: 'purple',
              category: 'Copywriting',
              title: 'Название задачи',
              date: '25.10.23'
            }
          ]
        },
        {
          title: 'Нужно сделать',
          tasks: [
            {
              theme: 'green',
              category: 'Research',
              title: 'Название задачи',
              date: '28.10.23'
            },
            {
              theme: 'orange',
              category: 'Web Design',
              title: 'Название задачи',
              date: '29.10.23'
            }
          ]
        },
        {
          title: 'В работе',
          tasks: [
            {
              theme: 'purple',
              category: 'Copywriting',
              title: 'Название задачи',
              date: '27.10.23'
            },
            {
              theme: 'orange',
              category: 'Web Design',
              title: 'Название задачи',
              date: '02.11.23'
            },
            {
              theme: 'green',
              category: 'Research',
              title: 'Название задачи',
              date: '03.11.23'
            }
          ]
        },
        {
          title: 'Тестирование',
          tasks: [
            {
              theme: 'orange',
              category: 'Web Design',
              title: 'Название задачи',
              date: '05.11.23'
            }
          ]
        },
        {
          title: 'Готово',
          tasks: [
            {
              theme: 'green',
              category: 'Research',
              title: 'Название задачи',
              date: '20.10.23'
            },
            {
              theme: 'purple',
              category: 'Copywriting',
              title: 'Название задачи',
              date: '22.10.23'
            }
          ]
        }
      ]
    }
  }
}
</script>

