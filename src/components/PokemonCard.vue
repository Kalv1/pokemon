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
    <div v-if="!isPending" class="bg-gray-100 border border-gray-300 flex flex-col justify-center items-center rounded-md pb-4 overflow-hidden font-pkmn">
        <div class="flex justify-between w-full pr-4">
            <div class="self-start bg-white px-4 py-2 rounded-br-lg border-b border-r border-gray-300">
                <p>#{{ idfy }}</p>
            </div>
            <TypeDetails :types="pokemonTypes" /> 
        </div>

        <img :src="pokemon.sprites.front_default" />
        <p class="capitalize">{{ name }}</p>
    </div>
</template>