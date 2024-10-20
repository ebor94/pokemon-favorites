<template>
    <svg :width="size" :height="size" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <component :is="iconComponent" :fill="color" />
    </svg>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import StarIcon from './icons/StarActiveIcon.vue';
  // Importa otros iconos aquí
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 44
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  });
  
  const iconComponent = computed(() => {
    switch (props.name) {
      case 'star':
        return StarIcon;
      // Añade casos para otros iconos aquí
      default:
        console.warn(`Icon ${props.name} not found`);
        return null;
    }
  });
  </script>