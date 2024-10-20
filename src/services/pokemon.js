import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  async getPokemons(limit = 20, offset = 0) {
    return axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  },
  
  async getPokemonByName(name) {
    return axios.get(`${API_URL}/pokemon/${name}`);
  }
};