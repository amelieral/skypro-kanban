<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './Task.vue';

export default {
  name: 'TaskColumn',
  components: { TaskItem },
  props: {
    title: String,
    tasks: Array
  }
}
</script>

<style scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: #94A6BE;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .cards {
    width: 100%;
    display: flex;
    overflow-y: auto;
  }
}
</style>