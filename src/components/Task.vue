<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div :class="['card__theme', `_${getTopicClass(task.topic)}`]">
          <p :class="`_${getTopicClass(task.topic)}`">{{ task.topic }}</p>
        </div>
        <a href="#taskModal">
          <div class="card__btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </a>
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
    getTopicClass(topic) {
      const map = {
        'Web Design': 'orange',
        'Research': 'green',
        'Copywriting': 'purple'
      };
      return map[topic] || 'gray';
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