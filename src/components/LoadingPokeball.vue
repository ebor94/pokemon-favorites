<template>
  <div class="loading-container">
    <div class="pokeball">
      <div class="pokeball-top"></div>
      <div class="pokeball-bottom"></div>
      <div class="pokeball-center"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.pokeball {
  width: 60px;
  height: 60px;
  position: relative;
  animation: shake 1.25s cubic-bezier(.36,.07,.19,.97) infinite;
}

.pokeball-top,
.pokeball-bottom {
  width: 100%;
  height: 50%;
  border-radius: 50px 50px 0 0;
  background-color: #f00;
}

.pokeball-bottom {
  border-radius: 0 0 50px 50px;
  background-color: #fff;
}

.pokeball-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #333;
  box-shadow: 0 0 0 2px #fff;
}

@keyframes shake {
  0% { transform: translate(0, 0) rotate(0); }
  20% { transform: translate(-10px, 0) rotate(-20deg); }
  30% { transform: translate(10px, 0) rotate(20deg); }
  50% { transform: translate(-10px, 0) rotate(-10deg); }
  60% { transform: translate(10px, 0) rotate(10deg); }
  100% { transform: translate(0, 0) rotate(0); }
}
</style>