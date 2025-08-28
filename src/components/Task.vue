<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div :class="['card__theme', getThemeClass(task.topic)]">
          <p>{{ task.topic }}</p>
        </div>
        <router-link :to="`/card/${task._id}`">
          <div class="card__btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </router-link>
      </div>
      <div class="card__content">
        <h3 class="card__title">{{ task.title }}</h3>
        <div class="card__date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <g clip-path="url(#clip0_1_415)">
              <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" 
                    stroke="#94A6BE" 
                    stroke-width="0.8" 
                    stroke-linejoin="round" />
              <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" 
                    stroke="#94A6BE" 
                    stroke-width="0.8" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_1_415">
                <rect width="13" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>{{ formatDate(task.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    getThemeClass(topic) {
      const themeMap = {
        'Web Design': '_orange',
        'Research': '_green',
        'Copywriting': '_purple'
      }
      return themeMap[topic] || '_gray';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\./g, '.');
    }
  }
}
</script>

<style scoped>

.cards__item {
  padding: 5px;
  animation: card-animation 500ms linear;
}

.cards__card {
  width: 220px;
  height: 130px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
}

.card__group {
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__theme {
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
}

.card__theme p {
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
}

.card__btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
}

.card__btn div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #94A6BE;
}

.card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
}

.card__content {
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.card__date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card__date p {
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #94A6BE;
  letter-spacing: 0.2px;
}

@media screen and (max-width: 1200px) {
  .cards__card {
    width: 220px;
    height: 130px;
    background-color: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }
}

@keyframes card-animation {
  0% { height: 0; opacity: 0; }
  100% { height: auto; opacity: 1; }
}

</style>