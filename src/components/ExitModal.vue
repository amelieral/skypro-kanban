<template>
  <div class="pop-exit">
    <div class="pop-exit__container" @click.self="$emit('cancel')">
      <div class="pop-exit__block">
        <h2>Выйти из аккаунта?</h2>
        <div class="pop-exit__form-group">
          <button class="pop-exit__exit-yes" @click.stop="$emit('confirm')">
            Да, выйти
          </button>
          <button class="pop-exit__exit-no" @click.stop="$emit('cancel')">
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExitModal'
}
</script>

<style scoped>
.pop-exit {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}

.pop-exit__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-exit__block {
  background: #FFFFFF;
  width: 370px;
  padding: 50px 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}

.pop-exit__form-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pop-exit__exit-yes {
  background: #565EEF;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
}

.pop-exit__exit-no {
  background: transparent;
  color: #565EEF;
  border: 1px solid #565EEF;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
}

@media (max-width: 375px) {
  .pop-exit__block {
    width: 90%;
    padding: 30px 20px;
  }
  
  .pop-exit__form-group {
    flex-direction: column;
  }
  
  .pop-exit__exit-yes,
  .pop-exit__exit-no {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>