<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>Регистрация</h2>
          </div>
          <form class="modal__form-login" @submit.prevent="handleSubmit">
            <input class="modal__input" type="text" v-model="name" placeholder="Имя" required />
            <input class="modal__input" type="text" v-model="login" placeholder="Логин" required />
            <input
              class="modal__input"
              type="password"
              v-model="password"
              placeholder="Пароль"
              required
            />
            <button class="modal__btn-enter _hover01" type="submit" :disabled="isLoading">
              {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div class="modal__form-group">
              <p>Уже есть аккаунт? <router-link to="/login">Войдите здесь</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/services/authApi'

export default {
  name: 'SignUpView',
  inject: ['auth'],
  data() {
    return {
      name: '',
      login: '',
      password: '',
      isLoading: false,
      error: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      this.error = ''

      try {
        const response = await registerUser(this.login, this.name, this.password)
        console.log('Ответ сервера при регистрации:', response)

        if (response.user && response.user.token) {
          this.auth.setUserInfo(response.user)
          console.log('Токен сохранен:', response.user.token)
          this.$router.push('/')
        } else {
          throw new Error('Токен не получен от сервера')
        }
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        this.error = error.message || 'Ошибка регистрации'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.container-signup {
  background-color: #eaeef6;
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.error-message {
  color: red;
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
.modal__form-login input:not(:last-child) {
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
