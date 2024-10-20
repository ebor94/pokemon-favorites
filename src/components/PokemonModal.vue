<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-md w-full">
      <div class="relative h-48 overflow-hidden rounded-t-lg">
        <!-- Fondo -->
        <img src="/src/assets/pokemon-background.png" alt="Background" class="w-full h-full object-cover">
        <!-- Pokémon -->
        <img 
          :src="pokemon.sprites.other['official-artwork'].front_default" 
          :alt="pokemon.name"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-40 object-contain"
        >
        <button @click="$emit('close')" class="absolute top-2 right-2 text-white text-xl bg-slate-300 rounded-full w-8 h-8 flex items-center justify-center">
          &times;
        </button>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-2">Name: {{ pokemon.name }}</h2>
        <p class="mb-2">Weight: {{ pokemon.weight }}</p>
        <p class="mb-2">Height: {{ pokemon.height }}</p>
        <p class="mb-4">Types: {{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
        <div class="flex justify-between items-center">
          <button @click="sharePokemon" class="bg-red-500 text-white px-4 py-2 rounded-full">
            Share to my friends
          </button>
          <button @click="toggleFavorite" class="text-2xl">
            {{ isFavorite ? '⭐' : '☆' }}
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>
  
  <script setup>
  import { computed } from 'vue';
  import { usePokemonStore } from '../stores/pokemon';
  
  const props = defineProps(['show', 'pokemon']);
  const emit = defineEmits(['close']);
  
  const store = usePokemonStore();
  
  const isFavorite = computed(() => {
    return store.favorites.some(p => p.id === props.pokemon.id);
  });
  
  const toggleFavorite = () => {
    store.toggleFavorite(props.pokemon);
  };
  
  const sharePokemon = () => {
    const text = `${props.pokemon.name}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${props.pokemon.types.map(t => t.type.name).join(', ')}`;
    navigator.clipboard.writeText(text)
      .then(() => alert('Pokémon details copied to clipboard!'))
      .catch(err => console.error('Error copying to clipboard:', err));
  };
  </script>

  