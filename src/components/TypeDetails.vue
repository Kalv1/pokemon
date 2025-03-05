<script setup lang="ts">
import { computed } from 'vue'
import { useTypeQuery } from '@/composables/useTypeQuery'

const props = defineProps<{
    types: string[]
}>()

const { results } = useTypeQuery(props.types)

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