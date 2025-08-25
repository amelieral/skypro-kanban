import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

export async function fetchTasks({ token }) {
  try {
    const data = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data.data.tasks
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message)
  }
}

export async function postTasks({ token, task }) {
  try {
    const data = await axios.post(API_URL, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    console.log('Ответ сервера:', data);
return data.data.tasks;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('Неверный формат данных')
    }
    throw new Error(error.response?.data?.error || error.message)
  }
}

export async function getTasksById({ token, id }) {
  try {
    const data = await axios.get(API_URL + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data.data
  } catch (error) {
     if (error.response?.status === 404) {
      throw new Error('Задача не найдена')
    }
    throw new Error(error.response?.data?.error || error.message)
  }
}

export async function editTask({ token, id, task }) {
   try {
      const data = await axios.put(API_URL + '/' + id, task, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })
   return data.data.tasks
   } catch (error) {
     throw new Error(error.response?.data?.error || error.message)
  }
}