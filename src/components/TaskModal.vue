<template>
  <div class="pop-browse">
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">Название задачи</h3>
            <div class="categories__theme theme-top" :class="getThemeClass(task.topic)">
              <p :class="getTextClass(task.topic)">{{ task.topic }}</p>
            </div>
          </div>
          <div v-if="error" class="error-message" style="color: red; margin-bottom: 15px">
            {{ error }}
          </div>
          <div class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <div
                v-for="statusOption in statusOptions"
                :key="statusOption.value"
                class="status__theme"
                :class="{
                  _active:
                    (!isEditing && statusOption.value === task.status) ||
                    (isEditing && statusOption.value === editedTask.status),
                  _hide: !isEditing && statusOption.value !== task.status,
                  _visible: isEditing,
                }"
                @click="isEditing && (editedTask.status = statusOption.value)"
              >
                <p>{{ statusOption.label }}</p>
              </div>
            </div>
          </div>
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
              <div class="form-browse__block">
                <label for="textArea01" class="subttl">Описание задачи</label>
                <textarea
                  class="form-browse__area"
                  name="text"
                  id="textArea01"
                  :readonly="!isEditing"
                  v-model="editedTask.description"
                  placeholder="Описание задачи"
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
                      @click="isEditing && selectDate(day)"
                    >
                      {{ formatDayNumber(day.day) }}
                    </div>
                  </div>
                </div>
                <input type="hidden" id="datepick_value" :value="formattedTaskDate" />
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения: <span class="date-control">{{ formattedTaskDateShort }}</span>
                  </p>
                  <p
                    v-if="isEditing"
                    class="calendar__p"
                    style="color: #565eef; margin-top: 5px"
                  ></p>
                </div>
              </div>
            </div>
          </div>
          <div class="theme-down__categories theme-down">
            <p class="categories__p subttl">Категория</p>
            <div v-if="!isEditing" class="categories__theme" :class="getThemeClass(task.topic)">
              <p :class="getTextClass(task.topic)">{{ task.topic }}</p>
            </div>
            <select v-else v-model="editedTask.topic" class="form-browse__select">
              <option value="Web Design">Web Design</option>
              <option value="Research">Research</option>
              <option value="Copywriting">Copywriting</option>
            </select>
          </div>

          <div class="pop-browse__btn-browse" v-if="!isEditing">
            <div class="btn-group">
              <button class="btn-browse__edit _btn-bor _hover03">
                <a href="#" @click.prevent="startEditing">Редактировать задачу</a>
              </button>
              <button class="btn-browse__delete _btn-bor _hover03" :disabled="isDeleting">
                <a href="#" @click.prevent="handleDeleteTask">
                  {{ isDeleting ? 'Удаление...' : 'Удалить задачу' }}
                </a>
              </button>
            </div>
            <button class="btn-browse__close _btn-bg _hover01" @click.prevent="closeModal">
              Закрыть
            </button>
          </div>

          <div class="pop-browse__btn-edit" v-else>
            <div class="btn-group">
              <button
                class="btn-edit__save _btn-bg _hover01"
                :disabled="isSaving"
                @click.prevent="saveTask"
              >
                {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <button class="btn-edit__cancel _btn-bor _hover03" @click.prevent="cancelEdit">
                Отменить
              </button>
              <button class="btn-edit__delete _btn-bor _hover03" :disabled="isDeleting">
                <a href="#" @click.prevent="handleDeleteTask">
                  {{ isDeleting ? 'Удаление...' : 'Удалить задачу' }}
                </a>
              </button>
            </div>
            <button class="btn-edit__close _btn-bg _hover01" @click.prevent="closeModal">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { deleteTask, editTask as apiEditTask } from '@/services/api.js'
import { getValidToken } from '@/services/auth.js'

export default {
  name: 'TaskModal',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const tasksData = inject('tasksData')

    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())
    const isEditing = ref(false)
    const editedTask = ref({
      title: props.task.title || '',
      description: props.task.description || '',
      topic: props.task.topic || '',
      status: props.task.status || 'Без статуса',
      date: props.task.date || new Date().toISOString().split('T')[0],
    })
    const error = ref('')
    const isDeleting = ref(false)
    const isSaving = ref(false)

    const statusOptions = [
      { value: 'Без статуса', label: 'Без статуса' },
      { value: 'Нужно сделать', label: 'Нужно сделать' },
      { value: 'В работе', label: 'В работе' },
      { value: 'Тестирование', label: 'Тестирование' },
      { value: 'Готово', label: 'Готово' },
    ]

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

    const formattedTaskDate = computed(() => {
      const dateToUse = isEditing.value ? editedTask.value.date : props.task?.date
      if (!dateToUse) return 'Дата не указана'
      const date = new Date(dateToUse)
      const month = monthNames[date.getMonth()]
      const year = date.getFullYear()
      return `${month} ${year}`
    })

    const formattedTaskDateShort = computed(() => {
      const dateToUse = isEditing.value ? editedTask.value.date : props.task?.date
      if (!dateToUse) return 'не указан'
      const date = new Date(dateToUse)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear().toString().slice(-2)
      return `${day}.${month}.${year}`
    })

    const currentMonthName = computed(() => monthNames[currentMonth.value])

    const getThemeClass = (topic) => {
      const themes = {
        'Web Design': '_orange',
        Research: '_green',
        Copywriting: '_purple',
      }
      return themes[topic] || '_gray'
    }

    const getTextClass = (topic) => {
      const themes = {
        'Web Design': '_orange',
        Research: '_green',
        Copywriting: '_purple',
      }
      return themes[topic] ? `_${topic.toLowerCase().replace(' ', '-')}` : '_gray'
    }

    const formatDayNumber = (day) => {
      return day.toString().padStart(2, '0')
    }

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
      const taskDate = editedTask.value.date ? new Date(editedTask.value.date) : null

      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const date = new Date(currentYear.value, currentMonth.value, day)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6
        const isToday = date.toDateString() === today.toDateString()
        const isSelected = taskDate && date.toDateString() === taskDate.toDateString()

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

    const selectDate = (day) => {
      if (!isEditing.value || !day.isCurrentMonth) return

      const selectedDate = new Date(day.date)
      const timezoneOffset = selectedDate.getTimezoneOffset() * 60000
      const correctedDate = new Date(selectedDate.getTime() - timezoneOffset)

      editedTask.value.date = correctedDate.toISOString().split('T')[0]
    }

    const startEditing = () => {
      isEditing.value = true

      if (props.task?.date) {
        const taskDate = new Date(props.task.date)
        currentMonth.value = taskDate.getMonth()
        currentYear.value = taskDate.getFullYear()
      }
    }

    const saveTask = async () => {
      const taskId = props.task?._id

      if (!taskId) {
        error.value = 'Ошибка: не удалось найти ID задачи для редактирования'
        return
      }

      if (!editedTask.value.description?.trim()) {
        error.value = 'Введите описание задачи'
        return
      }

      if (!editedTask.value.topic) {
        error.value = 'Выберите категорию'
        return
      }

      if (!editedTask.value.date) {
        error.value = 'Выберите дату'
        return
      }

      isSaving.value = true
      error.value = ''

      try {
        const token = getValidToken()
        if (!token) {
          error.value = 'Ошибка авторизации'
          return
        }

        await apiEditTask({
          token,
          id: taskId,
          task: editedTask.value,
        })

        Object.assign(props.task, {
          title: editedTask.value.title,
          description: editedTask.value.description,
          topic: editedTask.value.topic,
          status: editedTask.value.status,
          date: editedTask.value.date,
        })

        if (tasksData && typeof tasksData.refreshTasks === 'function') {
          await tasksData.refreshTasks()
        }

        isEditing.value = false
        error.value = ''
      } catch (err) {
        error.value = err.message || 'Ошибка при сохранении задачи'
      } finally {
        isSaving.value = false
      }
    }

    const cancelEdit = () => {
      editedTask.value = {
        title: props.task.title,
        description: props.task.description,
        topic: props.task.topic,
        status: props.task.status,
        date: props.task.date,
      }
      isEditing.value = false
      error.value = ''
    }

    const handleDeleteTask = async () => {
      const taskId = props.task?._id

      if (!taskId) {
        error.value = 'Ошибка: не удалось найти ID задачи для удаления'
        return
      }

      if (!confirm('Вы уверены, что хотите удалить эту задачу?')) {
        return
      }

      isDeleting.value = true
      error.value = ''

      try {
        const token = getValidToken()
        if (!token) {
          error.value = 'Ошибка авторизации'
          return
        }

        await deleteTask({ token, id: taskId })

        if (tasksData && typeof tasksData.refreshTasks === 'function') {
          await tasksData.refreshTasks()
        }

        closeModal()
      } catch (err) {
        error.value = err.message || 'Ошибка при удалении задачи'
      } finally {
        isDeleting.value = false
      }
    }

    const closeModal = () => {
      router.push('/')
    }

    onMounted(() => {
      document.body.classList.add('popup-open')
    })

    return {
      isEditing,
      editedTask,
      error,
      isDeleting,
      isSaving,
      currentMonth: currentMonthName,
      currentYear,
      formattedTaskDate,
      formattedTaskDateShort,
      calendarDays,
      statusOptions,
      getThemeClass,
      getTextClass,
      formatDayNumber,
      changeMonth,
      selectDate,
      startEditing,
      saveTask,
      cancelEdit,
      handleDeleteTask,
      closeModal,
    }
  },

  beforeUnmount() {
    document.body.classList.remove('popup-open')
  },
}
</script>

<style scoped>
.pop-browse {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
}

.pop-browse__content {
  display: block;
  text-align: left;
}

.pop-browse__container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}

.status {
  margin-bottom: 11px;
}
.status__p {
  margin-bottom: 14px;
}
.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}
.form-browse__area {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  resize: none;
}
.form-browse__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-browse__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}

.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}

.pop-browse__top-block {
  display: flex;
  justify-content: space-between;
}

.status__theme {
  cursor: pointer;
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

._btn-bor a {
  color: #565eef;
}

._btn-bg a {
  color: #ffffff;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;
}

._hide {
  display: none !important;
}

._hover03:hover {
  background-color: #565eef;
  color: #ffffff;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;
  transition: background-color 0.3s ease;
}

._btn-bor a {
  color: #565eef;
  transition: color 0.3s ease;
}

._btn-bg a {
  color: #ffffff;
}

.btn-browse__edit._btn-bor:hover,
.btn-browse__delete._btn-bor:hover {
  background-color: #565eef;
}

.btn-browse__edit._btn-bor:hover a,
.btn-browse__delete._btn-bor:hover a {
  color: #ffffff;
}

.status__theme {
  background-color: #ffffff;
  border: 0.7px solid #94a6be;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status__theme._active {
  background-color: #94a6be;
  color: #ffffff;
}

.status__theme._hide {
  display: none;
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

  .pop-browse {
    top: 70px;
  }

  .pop-browse__block {
    border-radius: 0;
  }
  .pop-browse__wrap {
    display: block;
  }
}

@media screen and (max-width: 495px) {
  .pop-browse__block {
    padding: 20px 16px 32px;
  }
  .pop-browse__content .theme-down {
    display: block;
    margin-bottom: 20px;
  }
  .pop-browse__content .theme-top {
    display: none;
  }
  .pop-browse__form {
    max-width: 100%;
  }
  .pop-browse__calendar {
    width: 100%;
  }
  .pop-browse__btn-browse button,
  .pop-browse__btn-edit button {
    width: 100%;
    height: 40px;
  }
  .pop-browse__btn-browse .btn-group,
  .pop-browse__btn-edit .btn-group {
    width: 100%;
  }
  .pop-browse__btn-browse .btn-group button,
  .pop-browse__btn-edit .btn-group button {
    margin-right: 0px;
  }
  .form-browse__area {
    max-width: 100%;
    height: 37px;
    resize: none;
  }
}
</style>
