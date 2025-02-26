<script setup lang="ts">
import { computed } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query';
import PokemonCard from '@/components/PokemonCard.vue';

const { data: pokemons, fetchNextPage, hasNextPage, isError, isPending } = useInfiniteQuery({
  queryKey: ['pokemons'],
  queryFn: async ({ pageParam }) => {
    const response = await fetch(pageParam)
    const data = await response.json()
    return data
  },
  initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
  getNextPageParam: (lastPage) => lastPage.next,
  refetchOnWindowFocus: false,
})


const pokemonList = computed(() => {
  const pages = pokemons.value?.pages

  const pagesResult = pages?.map((page) => page.results)

  return pagesResult?.flat()
})

</script>

<template>
  <template v-if="!isPending && !isError">
    <pokemon-card v-for="pokemon in pokemonList" :key="pokemon.id" :name="pokemon.name" />
    <button v-if="hasNextPage" @click="fetchNextPage()">
      Load more
    </button>
  </template>
  <template v-else>
    Loading...
  </template>
</template>
