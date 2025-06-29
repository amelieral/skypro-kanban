<template>
  <div class="pop-exit" id="exitModal">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <form class="pop-exit__form" id="formExit" action="#">
          <div class="pop-exit__form-group">
            <button class="pop-exit__exit-yes _hover01" id="exitYes">
              <a href="#">Да, выйти</a>
            </button>
            <button class="pop-exit__exit-no _hover03" id="exitNo">
              <a href="main.html">Нет, остаться</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExitModal'
}
</script>