<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { usePokeInfiniteQuery } from '@/composables/usePokeInfiniteQuery'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePokeQuery } from '@/composables/usePokeQuery'


const { isSearch, onSearch, searchResult } = usePokeQuery()
const { data: pokemons, fetchNextPage, hasNextPage, isError, isPending } = usePokeInfiniteQuery(isSearch.value)

const pokemonList = computed(() => {
  const pages = pokemons.value?.pages
  const pagesResult = pages?.map((page) => page.results)

  return isSearch.value ? searchResult.value ? searchResult.value : [] : pagesResult?.flat()
})

const pcontainer = ref<HTMLDivElement>()

onMounted(() => {
  ScrollTrigger.create({
    trigger: pcontainer.value,
    start: 'bottom bottom',
    onEnter: () => {
      if(hasNextPage.value) {
        fetchNextPage()
      }
    }
  })
})

// Scroll trigger part :
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
        class="w-5/6 md:w-2/3 px-2 absolute top-0 left-[50%] -translate-y-[50%] -translate-x-[50%] bg-white rounded-md border-2 border-[#2A2626] flex items-center "
      >
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 fill-gray-400" viewBox="0 0 24 24">
            <path
              d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"
            />
          </svg>
        </button>
        <input
          @input="onSearch"
          placeholder="Name or pokedex number"
          class="w-full placeholder:text-gray-400 p-2 py-4 outline-none"
        />
    </div>
  </div>
  <div v-show="!isPending && !isError">
    <div ref="pcontainer" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-4 pb-5">
      <pokemon-card v-for="pokemon in pokemonList" :key="pokemon.id" :name="pokemon.name" />
    </div>
  </div>
</template>
