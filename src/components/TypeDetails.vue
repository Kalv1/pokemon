<script setup lang="ts">
import { useQueries } from '@tanstack/vue-query';
import { computed } from 'vue'

const props = defineProps<{
    types: string[]
}>()


const fetchType = async (type: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await response.json()
    return data
}

const results = useQueries({
  queries: props.types.map((type) => ({
    queryKey: ['type', type],
    queryFn: () => fetchType(type),
    staleTime: Infinity,
  })),
})

const isPending = computed(() => results.value.some(query => query.isPending))

const typeDetails = computed(() => {
  return results.value.map((result) => result.data)
})


</script>

<template>
    <div v-if="!isPending" class="flex flex-wrap justify-center items-center gap-1 pointer-events-none">
        <img v-for="type in typeDetails" :key="type.name" :src="type.sprites['generation-vi']['omega-ruby-alpha-sapphire'].name_icon" />
    </div>
</template>