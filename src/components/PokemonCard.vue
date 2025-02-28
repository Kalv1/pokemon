<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

const props = defineProps<{
    name: string
}>()

const { data: pokemon, isPending } = useQuery({
    queryKey: ['pokemon-' + props.name],
    queryFn: async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
        const data = await response.json()
        return data
    },
})

const pokemonTypes = computed(() => {
    return pokemon.value?.types.map((type) => type.type.name)
})
</script>

<template>
    <div class="bg-gray-100 flex flex-col justify-center items-center rounded-md p-4 overflow-hidden card-pokemon">
        <p>{{ name }}</p>
        <p v-for="type in pokemonTypes" :key="type">{{ type }}</p>
        <img v-if="!isPending" :src="pokemon.sprites.front_default" />
    </div>
</template>