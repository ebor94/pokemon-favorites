<template>
    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        @input="$emit('search', searchTerm)"
        placeholder="Search"
        class="w-full p-2 border rounded-md"
      >
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchTerm = ref('');
  </script>