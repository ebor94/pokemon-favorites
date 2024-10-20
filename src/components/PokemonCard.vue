<template>
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      <div class="relative">
        <img 
          :src="pokemon.sprites.front_default" 
          :alt="pokemon.name"
          class="w-32 h-32 mx-auto"
        >
        <button 
          @click="toggleFavorite"
          class="absolute top-0 right-0 p-2"
          :class="{'text-red-500': isFavorite, 'text-gray-400': !isFavorite}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
  
      <div class="text-center mt-4">
        <h3 class="text-xl font-bold capitalize mb-2">{{ pokemon.name }}</h3>
        
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <span 
            v-for="type in pokemon.types" 
            :key="type.type.name"
            class="px-3 py-1 rounded-full text-sm"
            :class="getTypeColor(type.type.name)"
          >
            {{ type.type.name }}
          </span>
        </div>
  
        <div class="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p class="font-semibold">Height</p>
            <p>{{ (pokemon.height * 0.1).toFixed(1) }}m</p>
          </div>
          <div>
            <p class="font-semibold">Weight</p>
            <p>{{ (pokemon.weight * 0.1).toFixed(1) }}kg</p>
          </div>
        </div>
  
        <button 
          @click="sharePokemon"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full transition-colors"
        >
          Compartir
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { usePokemonStore } from '../stores/pokemon'
  
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true
    }
  })
  
  const store = usePokemonStore()
  
  const isFavorite = computed(() => {
    return store.favorites.some(p => p.id === props.pokemon.id)
  })
  
  const toggleFavorite = () => {
    store.toggleFavorite(props.pokemon)
  }
  
  const sharePokemon = () => {
    const stats = props.pokemon.stats
      .map(stat => `${stat.stat.name}: ${stat.base_stat}`)
      .join(', ')
    
    const text = `${props.pokemon.name}, ${stats}`
    
    navigator.clipboard.writeText(text)
      .then(() => alert('¡Copiado al portapapeles!'))
      .catch(err => console.error('Error al copiar:', err))
  }
  
  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400 text-white',
      fighting: 'bg-red-700 text-white',
      flying: 'bg-blue-300 text-gray-800',
      poison: 'bg-purple-500 text-white',
      ground: 'bg-yellow-600 text-white',
      rock: 'bg-yellow-800 text-white',
      bug: 'bg-green-500 text-white',
      ghost: 'bg-purple-800 text-white',
      steel: 'bg-gray-500 text-white',
      fire: 'bg-red-500 text-white',
      water: 'bg-blue-500 text-white',
      grass: 'bg-green-600 text-white',
      electric: 'bg-yellow-400 text-gray-800',
      psychic: 'bg-pink-500 text-white',
      ice: 'bg-blue-200 text-gray-800',
      dragon: 'bg-purple-600 text-white',
      dark: 'bg-gray-800 text-white',
      fairy: 'bg-pink-300 text-gray-800'
    }
    
    return colors[type] || 'bg-gray-400 text-white'
  }
  </script>