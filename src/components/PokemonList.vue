<template>
  <div>
    <input v-model="searchTerm" placeholder="Search Pokemon" class="w-full p-2 mb-4 border rounded">
    <LoadingPokeball v-if="store.loading" />
    <div v-else>
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
    <div class="mt-4 flex">
      <button @click="showAll" class="flex-1 mr-5 py-2 px-4 bg-red-500 text-white  rounded-full">All</button>
      <button @click="showFavorites" class="flex-1 py-2 px-4 bg-gray-300  rounded-full">Favorites</button>
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
}

const showFavorites = () => {
  showingFavorites.value = true
}

const selectPokemon = async (pokemon) => {
  selectedPokemon.value = await store.fetchPokemonDetails(pokemon.name)
}

onMounted(() => {
  store.fetchPokemons()
})
</script>