import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import PokemonList from './components/PokemonList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemons',
    name: 'PokemonList',
    component: PokemonList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router