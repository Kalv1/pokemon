<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const { isPending, data: pokemons } = useQuery({
  queryKey: ['pokemons'],
  queryFn: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()

    return data
  },
})


</script>

<template>
  <template v-if="!isPending">
    {{ pokemons }}
  </template>
  <template v-else>
    Loading...
  </template>
</template>
