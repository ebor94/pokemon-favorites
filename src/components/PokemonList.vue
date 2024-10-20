<template>
  <div>
    <SearchBar @search="handleSearch" />
    
    <div v-if="filteredPokemons.length > 0" class="bg-white rounded-lg shadow">
      <ul>
        <li v-for="pokemon in filteredPokemons" :key="pokemon.name" 
            class="flex justify-between items-center p-4 border-b last:border-b-0 cursor-pointer"
            @click="selectPokemon(pokemon)">
          <span class="capitalize">{{ pokemon.name }}</span>
          <button @click.stop="toggleFavorite(pokemon.name)" class="text-2xl">
            {{ pokemon.isFavorite ? '⭐' : '☆' }}
          </button>
        </li>
      </ul>
    </div>

    <NotFound v-else-if="searchTerm" @reset="resetSearch" />

    <div class="mt-4 flex">
      <button 
        @click="showAll"
        class="flex-1 py-2 px-4 bg-red-500 text-white rounded-l-md"
      >
        All
      </button>
      <button 
        @click="showFavorites"
        class="flex-1 py-2 px-4 bg-gray-300 rounded-r-md"
      >
        Favorites
      </button>
    </div>

    <PokemonModal 
      :show="!!selectedPokemon"
      :pokemon="selectedPokemon"
      @close="selectedPokemon = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../stores/pokemon';
import SearchBar from './SearchBar.vue';
import PokemonModal from './PokemonModal.vue';
import NotFound from './NotFound.vue';

const store = usePokemonStore();
const showingFavorites = ref(false);
const searchTerm = ref('');
const selectedPokemon = ref(null);

const filteredPokemons = computed(() => {
  let pokemons = showingFavorites.value ? store.getFavoritePokemons : store.pokemons;
  if (searchTerm.value) {
    return pokemons.filter(p => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
  }
  return pokemons;
});

const toggleFavorite = (pokemonName) => {
  store.toggleFavorite(pokemonName);
};

const showAll = () => {
  showingFavorites.value = false;
  searchTerm.value = '';
};

const showFavorites = () => {
  showingFavorites.value = true;
  searchTerm.value = '';
};

const handleSearch = (term) => {
  searchTerm.value = term;
};

const selectPokemon = async (pokemon) => {
  selectedPokemon.value = await store.getPokemonDetails(pokemon.name);
};

const resetSearch = () => {
  searchTerm.value = '';
  showingFavorites.value = false;
};

onMounted(() => {
  store.loadFavorites();
  store.fetchPokemons();
});
</script>