import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function loginUser(login, password) {
  try {
    const response = await axios.post(
      API_URL + '/login',
      { login, password },
      {
        headers: { 'Content-Type': '' }, 
      },
    )
    return response.data 
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Ошибка авторизации')
  }
}

export async function registerUser(login, name, password) {
  try {
    const response = await axios.post(
      API_URL,
      { login, name, password },
      {
        headers: { 'Content-Type': '' },
      },
    )
    return response.data 
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Ошибка регистрации')
  }
}

export async function getUsers() {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Ошибка загрузки пользователей')
  }
}
