<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo">
          <a href="#" target="_self"><img src="@/assets/img/logo.png" alt="logo"></a>
        </div>
        <div class="header__logo _dark">
          <a href="#" target="_self"><img src="@/assets/img/logo_dark.png" alt="logo"></a>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          <a href="#user-set-target" class="header__user _hover02">Ivan Ivanov</a>
          <div class="header__pop-user-set pop-user-set" id="user-set-target">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox">
            </div>
            <button type="button" class="_hover03"><a href="#popExit">Выйти</a></button>
          </div>
        </nav>          
      </div>
    </div>            
  </header>
</template>
<script>
export default {
  name: 'BaseHeader'
}
</script>

<style scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
  position: relative;
}

.header__block {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565EEF;
  color: #FFFFFF;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.header__user {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #565EEF;
}

.user-arrow {
  display: block;
  width: 6px;
  height: 6px;
  border-left: 1.9px solid #565EEF;
  border-bottom: 1.9px solid #565EEF;
  transform: rotate(-45deg);
}

.header__pop-user-set {
  position: absolute;
  top: 60px;
  right: 0;
  width: 213px;
  padding: 34px;
  background: #FFF;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  z-index: 100;
}

.pop-user-set__name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
}

.pop-user-set__mail {
  color: #94A6BE;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
}

.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}

.pop-user-set__theme input[type=checkbox] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #EAEEF6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.pop-user-set__theme input[type=checkbox]::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #94A6BE;
  transition: 0.5s;
}

.pop-user-set__theme input:checked[type=checkbox]::before {
  left: 12px;
}

.pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565EEF;
  border-radius: 4px;
  border: 1px solid #565EEF;
  transition: all 0.3s ease;
}

.pop-user-set button:hover {
  background-color: #565EEF;
  color: #FFFFFF;
}

.pop-user-set button:hover a {
  color: #FFFFFF;
}

.pop-user-set button a {
  color: #565EEF;
  transition: all 0.3s ease;
}

@media screen and (max-width: 495px) {
  .header__btn-main-new {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
}
</style>