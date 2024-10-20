<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white p-4">
    <div class="w-full max-w-md text-center">
      <div class="relative w-48 h-48 mx-auto mb-8">
        <div class="absolute inset-0 bg-red-500 rounded-full"></div>
        <img 
          src="../assets/pikachu.png" 
          alt="Pikachu" 
          class="absolute inset-0 w-full h-full ml-6  object-contain z-10"
        >
      </div>
      
      <h1 class="text-3xl font-bold mb-4">Welcome to Pokédex</h1>
      
      <p class="text-gray-600 mb-8">
        The digital encyclopedia created by Professor Oak is
        an invaluable tool to Trainers in the Pokémon world.
      </p>
      
      <button 
        @click="startApp" 
        class="bg-red-500 text-white font-bold py-3 px-6 rounded-full hover:bg-red-600 transition duration-300"
      >
        Get started
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const startApp = () => {
  router.push('/pokemons');
};
</script>