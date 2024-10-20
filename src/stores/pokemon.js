import { defineStore } from 'pinia';
import { pokemonService } from '../services/pokemon';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    favorites: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPokemons() {
      this.loading = true;
      try {
        const response = await pokemonService.getPokemons(20, 0);
        this.pokemons = response.data.results.map(pokemon => ({
          ...pokemon,
          isFavorite: this.favorites[pokemon.name] || false
        }));
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching pokemons:', error);
      } finally {
        this.loading = false;
      }
    },

    toggleFavorite(pokemonName) {
      this.favorites[pokemonName] = !this.favorites[pokemonName];
      const pokemonIndex = this.pokemons.findIndex(p => p.name === pokemonName);
      if (pokemonIndex !== -1) {
        this.pokemons[pokemonIndex].isFavorite = this.favorites[pokemonName];
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    loadFavorites() {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    },

    async getPokemonDetails(name) {
      try {
        const response = await pokemonService.getPokemonByName(name);
        return {
          ...response.data,
          isFavorite: this.favorites[name] || false
        };
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
        return null;
      }
    },
  },

  getters: {
    getFavoritePokemons() {
      return this.pokemons.filter(pokemon => this.favorites[pokemon.name]);
    }
  }
});