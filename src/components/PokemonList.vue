<template>
  <div>
    <input v-model="searchTerm" placeholder="Search Pokemon" class="w-full p-2 mb-4 border rounded">
    <LoadingPokeball v-if="store.loading" />
    <div v-else class="bg-gray">
      <ul v-if="filteredPokemons.length > 0">
        <li v-for="pokemon in filteredPokemons" :key="pokemon.name" class="flex justify-between items-center p-2 border-b">
          <span @click="selectPokemon(pokemon)" class="cursor-pointer">{{ pokemon.name }}</span>
          <button @click="toggleFavorite(pokemon)" class="focus:outline-none">
            <Icon 
              name="star" 
              :color="store.isFavorite(pokemon) ? '#ECA539' : '#BFBFBF'"
            />
          </button>
        </li>
      </ul>
      <p v-else>No Pokémon found</p>
    </div>
    <div class="mt-4  flex justify-center bg-gray-200">
      <button @click="showAll" 
      class="flex mr-3 items-center justify-center w-32 px-4 py-2 text-white rounded-full transition-colors duration-200"
      :class="showbutton ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
     
      >
        
        <ListBulletIcon class="w-5 h-5 mr-2" />
        All
      </button>
      <button
       @click="showFavorites" 
       class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-full"
       :class="!showbutton ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
       >
       
       <StarIcon class="w-5 h-5 mr-2" />
        Favorites
      </button>
   
    </div>
    <PokemonModal :show="!!selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import PokemonModal from './PokemonModal.vue'
import LoadingPokeball from './LoadingPokeball.vue'
import Icon from './Icon.vue';
import { ListBulletIcon, StarIcon } from '@heroicons/vue/24/solid'


const showbutton = ref(true)
const store = usePokemonStore()
const searchTerm = ref('')
const showingFavorites = ref(false)
const selectedPokemon = ref(null)

const filteredPokemons = computed(() => {
  let pokemons = showingFavorites.value ? store.favorites : store.pokemons
  if (searchTerm.value) {
    return pokemons.filter(p => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  }
  return pokemons
})

const toggleFavorite = (pokemon) => {
  store.toggleFavorite(pokemon)
}

const showAll = () => {
  showingFavorites.value = false
  showbutton.value = true
}

const showFavorites = () => {
  showingFavorites.value = true
  showbutton.value = false
}

const selectPokemon = async (pokemon) => {
  selectedPokemon.value = await store.fetchPokemonDetails(pokemon.name)
}

onMounted(() => {
  store.fetchPokemons()
})
</script>