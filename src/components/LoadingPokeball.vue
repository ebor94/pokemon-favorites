<template>
  <div class="flex justify-center items-center h-screen">
    <div class="pokeball animate-spin">
      <div class="pokeball-top"></div>
      <div class="pokeball-middle"></div>
      <div class="pokeball-bottom"></div>
    </div>
  </div>
</template>

<style scoped>
.pokeball {
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #000;
  background: white;
}

.pokeball-top {
  background: #ff1a1a;
  height: 50%;
}

.pokeball-middle {
  background: #000;
  height: 4px;
}

.pokeball-bottom {
  background: #fff;
  height: calc(50% - 4px);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>