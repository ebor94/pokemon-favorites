<template>
    <div class="flex flex-col items-center justify-center h-64">
      <h2 class="text-4xl font-bold mb-4">Uh-oh!</h2>
      <p class="text-xl mb-8">You look lost on your journey!</p>
      <button 
        @click="$emit('reset')" 
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Go back home
      </button>
    </div>
  </template>
  
  <script setup>
  defineEmits(['reset']);
  </script>