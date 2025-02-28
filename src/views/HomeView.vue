<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import PokemonCard from '@/components/PokemonCard.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const {
  data: pokemons,
  fetchNextPage,
  hasNextPage,
  isError,
  isPending,
} = useInfiniteQuery({
  queryKey: ['pokemons'],
  queryFn: async ({ pageParam }) => {
    const response = await fetch(pageParam)
    const data = await response.json()
    return data
  },
  initialPageParam: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
  getNextPageParam: (lastPage) => lastPage.next,
  refetchOnWindowFocus: false,
})

const pcontainer = ref<HTMLDivElement>()

onMounted(() => {
  ScrollTrigger.create({
    trigger: pcontainer.value,
    start: 'bottom bottom',
    markers: true,
    onEnter: () => {
      if(hasNextPage.value) {
        fetchNextPage()
      }
    }
  })
})

const pokemonList = computed(() => {
  const pages = pokemons.value?.pages

  const pagesResult = pages?.map((page) => page.results)

  return pagesResult?.flat()
})

watch(pokemonList, () => {
  // Approximate delay to refetch all pokémons data after a new page is loaded
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 500)
})
</script>

<template>
  <div class="bg-[#2A2626] h-[80vh] relative overflow-hidden">
    <img
      src="@/assets/noise.png"
      class="absolute top-0 left-0 w-full h-full object-cover opacity-60"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1246"
      height="1246"
      viewBox="0 0 1246 1246"
      fill="none"
      class="-top-[60%] left-[55%] absolute opacity-70"
    >
      <g filter="url(#filter0_f_7_35)">
        <circle cx="623" cy="623" r="323" fill="url(#paint0_radial_7_35)" />
      </g>
      <defs>
        <filter
          id="filter0_f_7_35"
          x="0"
          y="0"
          width="1246"
          height="1246"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_7_35" />
        </filter>
        <radialGradient
          id="paint0_radial_7_35"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(623 623) rotate(90) scale(323)"
        >
          <stop stop-color="#4B4B4B" />
          <stop offset="1" stop-color="#B1B1B1" />
        </radialGradient>
      </defs>
    </svg>
    <div class="relative z-10 container mx-auto flex flex-col-reverse md:flex-row h-full items-center justify-center">
      <div class="text-white tracking-wide w-1/2 text-center md:text-left">
        <h1 class=" font-clash font-bold text-3xl lg:text-6xl">POKEDEX</h1>
        <p>
          A Pokémon search engine, using Vue 3 / Vite / Vue Query / Tailwind CSS <br/>
          You can find the source code of the application available on github: <br> <a href="https://github.com/Kalv1/pokemon" class="">Github</a>
        </p>
      </div>
      <div class="w-1/2 flex justify-center mb-15 md:mb-0">
        <img class="w-full md:w-2/3" src="@/assets/pokedex.png"/>
      </div>
    </div>
  </div>
  <div class="relative">
    <div
        class="w-5/6 md:w-2/3 p-2 absolute top-0 left-[50%] -translate-y-[50%] -translate-x-[50%] bg-white rounded-md border-2 border-[#2A2626] flex items-center "
      >
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 fill-gray-400" viewBox="0 0 24 24">
            <path
              d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
            />
          </svg>
        </button>
        <input
          placeholder="Name or pokedex number"
          class="w-full placeholder:text-gray-400 p-2 outline-none"
        />
        <button class="p-2 bg-black rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-white" viewBox="0 0 16 16">
            <path
              d="M6 9.5A2 2 0 0 1 7.937 11H13.5a.5.5 0 0 1 .09.992L13.5 12l-5.563.001a2 2 0 0 1-3.874 0L2.5 12a.5.5 0 0 1-.09-.992L2.5 11h1.563A2 2 0 0 1 6 9.5m0 1a1 1 0 1 0 0 2a1 1 0 0 0 0-2m4-8A2 2 0 0 1 11.937 4H13.5a.5.5 0 0 1 .09.992L13.5 5l-1.563.001a2 2 0 0 1-3.874 0L2.5 5a.5.5 0 0 1-.09-.992L2.5 4h5.563A2 2 0 0 1 10 2.5m0 1a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
            />
          </svg>
        </button>
    </div>
  </div>
  <template v-if="!isPending && !isError">
    <div ref="pcontainer" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-4">
      <pokemon-card v-for="pokemon in pokemonList" :key="pokemon.id" :name="pokemon.name" />
    </div>
  </template>
  <template v-else> Loading... </template>
</template>
