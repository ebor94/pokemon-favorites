import { defineStore } from 'pinia'
import { pokemonService } from '../services/pokemon';
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    favorites: [],
    loading: false,
    detailLoading: false,
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true
      try {
        const response = await pokemonService.getPokemons(20, 0);
        this.pokemons = response.data.results.map(pokemon => ({
          ...pokemon,
          isFavorite: this.favorites[pokemon.name] || false
        }));
      } catch (error) {
        console.error('Error fetching pokemons:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonDetails(name) {
      this.detailLoading = true
      try {
        const response = await pokemonService.getPokemonByName(name);
        return {
          ...response.data,
          isFavorite: this.favorites[name] || false
        };
      } catch (error) {
        console.error('Error fetching pokemon details:', error)
      } finally {
        this.detailLoading = false
      }
    },
    toggleFavorite(pokemon) {
      const index = this.favorites.findIndex(p => p.name === pokemon.name)
      if (index === -1) {
        this.favorites.push(pokemon)
      } else {
        this.favorites.splice(index, 1)
      }
    },
    isFavorite(pokemon) {
      return this.favorites.some(p => p.name === pokemon.name)
    }
  }
})