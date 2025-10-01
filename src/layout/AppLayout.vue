<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script>
import { onMounted, provide, ref } from 'vue'

export default {
  name: 'AppLayout',
  setup() {
    const userInfo = ref(null)

    function setUserInfo(value) {
      userInfo.value = value
      try {
        localStorage.setItem('userInfo', JSON.stringify(value))
        if (value.token) {
          localStorage.setItem('authToken', value.token)
        }
      } catch (e) {
        console.error('ошибка:', e)
        return null
      }
    }

    function removeUserInfo() {
      userInfo.value = null
      try {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('authToken')
      } catch (e) {
        console.error('ошибка:', e)
      }
    }

    function getValidToken() {
      const token = localStorage.getItem('authToken')
      if (!token || token === 'undefined' || token === 'null') {
        throw new Error('Требуется авторизация. Пожалуйста, войдите в систему.')
      }
      return token
    }

    function isUserAuthenticated() {
      const token = localStorage.getItem('authToken')
      return !!token && token !== 'undefined' && token !== 'null' && token !== '[]'
    }

    function checkAuthAndRedirect(router) {
      if (!isUserAuthenticated()) {
        router.push('/login')
        return false
      }
      return true
    }

    const updateTask = (updatedTask) => {
      console.log('Global task update:', updatedTask)
    }

    const removeTask = (taskId) => {
      console.log('Global task removal:', taskId)
    }

    provide('auth', {
      user: userInfo,
      setUserInfo: setUserInfo,
      removeUser: removeUserInfo,
      getToken: getValidToken,
      isAuthenticated: isUserAuthenticated,
      checkAuth: checkAuthAndRedirect,
    })

    provide('taskMethods', {
      updateTask,
      removeTask,
    })

    onMounted(() => {
      try {
        const data = localStorage.getItem('userInfo')
        if (data) {
          userInfo.value = JSON.parse(data)
        }
      } catch (e) {
        userInfo.value = null
        console.error('ошибка', e)
      }
    })

    return {}
  },
}
</script>
