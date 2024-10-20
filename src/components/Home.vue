<template>
    <div class="flex flex-col items-center justify-center min-h-screen  p-4">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div class="relative w-40 h-40 mx-auto mb-6">
          <div class="absolute inset-0 bg-red-500 rounded-full"></div>
          <img 
            src="../assets/pikachu.png" 
            alt="Pikachu" 
            class="absolute inset-0 w-full h-full object-contain"
          >
        </div>
        <h1 class="text-3xl font-bold mb-4">Welcome to Pokédex</h1>
        <p class="text-gray-600 mb-8">
          The digital encyclopedia created by Professor Oak is an invaluable tool
          to Trainers in the Pokémon world.
        </p>
        <router-link 
          to="/pokemons" 
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Get started
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const pikachuImage = ref('');
  
  onMounted(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
      const data = await response.json();
      pikachuImage.value = data.sprites.other['official-artwork'].front_default;
    } catch (error) {
      console.error('Error fetching Pikachu image:', error);
    }
  });
  </script>