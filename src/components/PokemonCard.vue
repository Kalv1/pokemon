<script setup lang="ts">
import TypeDetails from '@/components/TypeDetails.vue'
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

const props = defineProps<{
    name: string
}>()

const { data: pokemon, isPending } = useQuery({
    queryKey: ['pokemon',  props.name],
    queryFn: async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
        const data = await response.json()
        return data
    },
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
})

const pokemonTypes = computed(() => {
    return pokemon.value?.types.map((type) => type.type.name)
})

const idfy = computed(() => {
    const pokemonId = pokemon.value?.id

    if(pokemonId < 10) {
        return "00" + pokemonId
    } else if (pokemonId < 100) {
        return "0" + pokemonId
    } else {
        return pokemonId
    }
})
</script>

<template>
    <div v-if="!isPending" class="bg-gray-100 flex flex-col justify-center items-center rounded-md p-4 overflow-hidden card-pokemon font-pkmn">
        <TypeDetails :types="pokemonTypes" /> 
        <img :src="pokemon.sprites.front_default" />
        <p>{{ name }}</p>
        <p>#{{ idfy }}</p>
    </div>
</template>