<template>
  <div class="pop-new-card">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="closeModal">&#10006;</a>
          <div class="pop-new-card__wrap">
            <form
              class="pop-new-card__form form-new"
              id="formNewCard"
              @submit.prevent="handleCreateTask"
            >
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input
                  class="form-new__input"
                  type="text"
                  name="name"
                  id="formTitle"
                  v-model="title"
                  placeholder="Введите название задачи..."
                  required
                />
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea
                  class="form-new__area"
                  name="text"
                  id="textArea"
                  v-model="description"
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </form>
            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__nav">
                  <div class="calendar__month">{{ currentMonth }} {{ currentYear }}</div>
                  <div class="nav__actions">
                    <div class="nav__action" @click="changeMonth(-1)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                        />
                      </svg>
                    </div>
                    <div class="nav__action" @click="changeMonth(1)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="calendar__content">
                  <div class="calendar__days-names">
                    <div class="calendar__day-name">пн</div>
                    <div class="calendar__day-name">вт</div>
                    <div class="calendar__day-name">ср</div>
                    <div class="calendar__day-name">чт</div>
                    <div class="calendar__day-name">пт</div>
                    <div class="calendar__day-name -weekend-">сб</div>
                    <div class="calendar__day-name -weekend-">вс</div>
                  </div>
                  <div class="calendar__cells">
                    <div
                      v-for="day in calendarDays"
                      :key="day.id"
                      class="calendar__cell"
                      :class="{
                        '_other-month': !day.isCurrentMonth,
                        '_cell-day': day.isCurrentMonth,
                        _weekend: day.isWeekend,
                        _current: day.isToday,
                        '_active-day': day.isSelected,
                      }"
                      @click="selectDate(day)"
                    >
                      {{ formatDayNumber(day.day) }}
                    </div>
                  </div>
                </div>

                <input type="hidden" id="datepick_value" :value="selectedDate" />
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Выберите срок исполнения
                    <span class="date-control">{{ formattedSelectedDate }}</span
                    >.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div
                class="categories__theme _orange"
                :class="{ '_active-category': selectedTopic === 'Web Design' }"
                @click="selectedTopic = 'Web Design'"
              >
                <p class="_orange">Web Design</p>
              </div>
              <div
                class="categories__theme _green"
                :class="{ '_active-category': selectedTopic === 'Research' }"
                @click="selectedTopic = 'Research'"
              >
                <p class="_green">Research</p>
              </div>
              <div
                class="categories__theme _purple"
                :class="{ '_active-category': selectedTopic === 'Copywriting' }"
                @click="selectedTopic = 'Copywriting'"
              >
                <p class="_purple">Copywriting</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="form-new__create _hover01"
            id="btnCreate"
            :disabled="isLoading"
            @click="handleCreateTask"
          >
            {{ isLoading ? 'Создание...' : 'Создать задачу' }}
          </button>

          <div v-if="error" class="error-message" style="color: red; margin-top: 10px">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { postTasks } from '@/services/api'
import { getAuthToken } from '@/services/auth'

export default {
  name: 'PopNewCard',
  setup() {
    const router = useRouter()
    const tasksData = inject('tasksData')

    const title = ref('')
    const description = ref('')
    const selectedTopic = ref(null)
    const selectedDate = ref(new Date())
    const isLoading = ref(false)
    const error = ref('')
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())

    const monthNames = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ]

    const formatDayNumber = (day) => {
      return day.toString().padStart(2, '0')
    }

    const formattedSelectedDate = computed(() => {
      if (!selectedDate.value) return 'не выбрана'

      const day = selectedDate.value.getDate().toString().padStart(2, '0')
      const month = (selectedDate.value.getMonth() + 1).toString().padStart(2, '0')
      const year = selectedDate.value.getFullYear().toString().slice(-2)

      return `${day}.${month}.${year}`
    })

    const apiFormattedDate = computed(() => {
      if (!selectedDate.value) return ''
      const year = selectedDate.value.getFullYear()
      const month = (selectedDate.value.getMonth() + 1).toString().padStart(2, '0')
      const day = selectedDate.value.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    })

    const calendarDays = computed(() => {
      const days = []
      const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
      const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)

      const firstDayWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay()
      const daysFromPrevMonth = firstDayWeekday - 1
      const lastDayOfPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()

      for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        const day = lastDayOfPrevMonth - i
        days.push({
          id: `prev-${day}`,
          day: day,
          date: new Date(currentYear.value, currentMonth.value - 1, day),
          isCurrentMonth: false,
          isWeekend: false,
          isToday: false,
          isSelected: false,
        })
      }

      const today = new Date()
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const date = new Date(currentYear.value, currentMonth.value, day)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6
        const isToday = date.toDateString() === today.toDateString()
        const isSelected =
          selectedDate.value && date.toDateString() === selectedDate.value.toDateString()

        days.push({
          id: `current-${day}`,
          day: day,
          date: date,
          isCurrentMonth: true,
          isWeekend: isWeekend,
          isToday: isToday,
          isSelected: isSelected,
        })
      }

      const totalCells = 42
      const remainingCells = totalCells - days.length
      for (let day = 1; day <= remainingCells; day++) {
        days.push({
          id: `next-${day}`,
          day: day,
          date: new Date(currentYear.value, currentMonth.value + 1, day),
          isCurrentMonth: false,
          isWeekend: false,
          isToday: false,
          isSelected: false,
        })
      }

      return days
    })

    const selectDate = (day) => {
      if (day.isCurrentMonth) {
        selectedDate.value = day.date
      }
    }

    const changeMonth = (direction) => {
      currentMonth.value += direction
      if (currentMonth.value > 11) {
        currentMonth.value = 0
        currentYear.value += 1
      } else if (currentMonth.value < 0) {
        currentMonth.value = 11
        currentYear.value -= 1
      }
    }

    const handleCreateTask = async () => {
      if (!title.value.trim()) {
        error.value = 'Введите название задачи'
        return
      }

      if (!description.value.trim()) {
        error.value = 'Введите описание задачи'
        return
      }

      if (!selectedTopic.value) {
        error.value = 'Выберите категорию'
        return
      }

      if (!selectedDate.value) {
        error.value = 'Выберите дату'
        return
      }

      isLoading.value = true
      error.value = ''

      try {
        const token = getAuthToken()
        if (!token) {
          throw new Error('Требуется авторизация')
        }

        const taskData = {
          title: title.value.trim(),
          description: description.value.trim(),
          topic: selectedTopic.value,
          date: apiFormattedDate.value,
          status: 'В работе',
        }

        const updatedTasks = await postTasks({ token, task: taskData })

        if (tasksData && typeof tasksData.setTasks === 'function') {
          tasksData.setTasks(updatedTasks)
        }

        closeModal()
      } catch (err) {
        error.value = err.message || 'Ошибка создания задачи'
      } finally {
        isLoading.value = false
      }
    }

    const closeModal = () => {
      router.push('/')
    }

    onMounted(() => {
      document.body.classList.add('popup-open')
    })

    return {
      title,
      description,
      selectedTopic,
      selectedDate,
      isLoading,
      error,
      currentMonth: computed(() => monthNames[currentMonth.value]),
      currentYear,
      calendarDays,
      formattedSelectedDate,
      formatDayNumber,
      selectDate,
      changeMonth,
      handleCreateTask,
      closeModal,
    }
  },

  beforeUnmount() {
    document.body.classList.remove('popup-open')
  },
}
</script>

<style scoped>
.pop-new-card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.pop-new-card__container {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

body.popup-open {
  overflow: hidden;
}

.pop-new-card__block {
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-new-card__content {
  text-align: left;
}
.pop-new-card__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}
.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;
}
.pop-new-card__close:hover {
  color: #000000;
}
.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.categories {
  margin-bottom: 20px;
}

.calendar {
  width: 182px;
  margin-bottom: 20px;
}

._current {
  font-weight: 700;
}

.calendar__ttl {
  margin-bottom: 14px;
  padding: 0 7px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.calendar__p {
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
}
.calendar__p span {
  color: #000000;
}

.calendar__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
}

.calendar__month {
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
}

.calendar__content {
  margin-bottom: 12px;
}

.calendar__days-names {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
}

.calendar__day-name {
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
}

.calendar__cells {
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
}

.calendar__cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
}

.calendar__cell._other-month {
  opacity: 0;
}

.calendar__cell._cell-day:hover {
  color: #94a6be;
  background-color: #eaeef6;
}

.calendar__cell._active-day {
  background-color: #94a6be;
  color: #ffffff;
}

.calendar__cell._current {
  font-weight: 700;
}

._other-month {
  opacity: 0;
}

._cell-day:hover {
  color: #94a6be;
  background-color: #eaeef6;
}

._active-day {
  background-color: #94a6be;
  color: #ffffff;
}

.nav__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__action {
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__action svg {
  fill: #94a6be;
}

.categories__themes {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}

.categories__theme {
  padding: 8px 12px;
  border-radius: 24px;
  opacity: 0.4;
  cursor: pointer;
}

._active-category {
  opacity: 1 !important;
}

.form-new__block {
  display: flex;
  flex-direction: column;
}
.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  resize: none;
  font-family: inherit;
}

.form-new__input {
  margin: 20px 0;
}

.form-new__area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}

.form-new__input::-moz-placeholder,
.form-new__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
  font-family: inherit;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
  font-family: inherit;
}

.form-new__create {
  width: 132px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
}

.form-new__create:hover {
  background-color: #33399b;
}

@media screen and (max-width: 660px) {
  .calendar {
    max-width: 340px;
    width: 100%;
  }
  .calendar__ttl,
  .calendar__nav,
  .calendar__period {
    padding: 0;
  }
  .calendar .date-create {
    display: none;
    margin-bottom: 7px;
  }
  .calendar__p {
    font-size: 14px;
  }
  .calendar__day-name {
    font-size: 14px;
  }
  .calendar__cells {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .calendar__cell {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  .pop-new-card {
    top: 70px;
  }
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-new-card__block {
    border-radius: 0;
  }
  .pop-new-card__wrap {
    display: block;
  }
}

@media screen and (max-width: 495px) {
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-new-card__block {
    padding: 20px 16px 32px;
  }
  .pop-new-card__form {
    max-width: 100%;
    width: 100%;
    display: block;
  }
  .pop-new-card__calendar {
    width: 100%;
  }
  .form-new__area {
    max-width: 100%;
    height: 34px;
  }
  .form-new__create {
    width: 100%;
    height: 40px;
  }
}
</style>
