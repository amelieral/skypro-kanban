<template>
   <div class="not-found">
      <div class="content">
        <h1 class="error-code">404</h1>

<div class="error-message">
   <span class="en">Page Not Found</span>
   <span class="ru">Страница не найдена</span>
</div>

<router-link to="/" class="home-button">
   Вернуться на главную
</router-link>
</div>
   </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  background:#eaeef6;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.content {
  text-align: center;
  z-index: 2; 
  padding: 2rem;
  position: relative; 
}

.error-code {
  font-size: 15rem;
  margin: 0;
  color:#565eef;
  text-shadow: 0 0 20px rgba(148, 166, 190, 0.4);
  animation: float 3s ease-in-out infinite;
}

.error-message {
  margin: 2rem 0;
  color:  #94a6be;
}

.en {
  display: block;
  font-size: 2.5rem;
  letter-spacing: 2px;
}

.ru {
  display: block;
  font-size: 1.8rem;
  opacity: 0.8;
}

.home-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #565eef, #94a6be);
  color: #0a192f;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 2rem;
  position: relative; 
  z-index: 3; 
  cursor: pointer; 
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(148, 166, 190, 0.4);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes wave {
  0% { transform: translateX(0); }
  50% { transform: translateX(-100px); }
  100% { transform: translateX(0); }
}
</style>