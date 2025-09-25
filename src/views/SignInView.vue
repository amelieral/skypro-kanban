<template>
  <div class="wrapper">
    <div class="container-signin">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>Вход</h2>
          </div>
          <form class="modal__form-login" @submit.prevent="handleSignIn">
            <input
              class="modal__input"
              type="text"
              v-model="login"
              placeholder="Логин"
              required
            />
            <input
              class="modal__input"
              type="password"
              v-model="password"
              placeholder="Пароль"
              required
            />
            <button class="modal__btn-enter _hover01" type="submit" :disabled="isLoading">
              {{ isLoading ? 'Вход...' : 'Войти' }}
            </button>
            
            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div class="modal__form-group">
              <p>Нужно зарегистрироваться?</p>
              <router-link to="/signup">Регистрируйтесь здесь</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/services/authApi'

export default {
  name: 'SignInView',
  inject: ['auth'],
  data() {
    return {
      login: '',
      password: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async handleSignIn() {
      this.isLoading = true
      this.error = ''

      try {
        const response = await loginUser(this.login, this.password)
        console.log('Ответ сервера при входе:', response)

        if (response.user && response.user.token) {
          this.auth.setUserInfo(response.user) 
          console.log('Токен сохранен:', response.user.token)
          this.$router.push('/')
        } else {
          throw new Error('Токен не получен от сервера')
        }
      } catch (error) {
        console.error('Ошибка входа:', error)
        this.error = error.message || 'Ошибка входа'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}
.container-signin {
  background-color: #eaeef6;
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__form-login input:first-child {
  margin-bottom: 7px;
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
}
.modal__input::placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__btn-enter {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
}
.modal__btn-enter a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: rgba(148, 166, 190, 0.4);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
}
.modal__form-group a {
  text-decoration: underline;
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;
  }
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border-radius: none;
    border: none;
    box-shadow: none;
  }
  .modal__btn-enter {
    height: 40px;
  }
}
</style>
