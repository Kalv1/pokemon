import { QueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const queryClient = new QueryClient()

export const usePokeQuery = () => {
  const searchResult = ref()
  const isSearch = ref(false)
  const isDelay = ref<undefined | number>(undefined)

  const onSearch = async (event: Event) => {
    const target = event.target as HTMLInputElement

    const searchValue = target?.value

    if (!searchValue) {
      isSearch.value = false
      return
    }

    isSearch.value = true

    if (isDelay.value) {
      clearTimeout(isDelay.value)
    }

    isDelay.value = setTimeout(() => {
      console.log('search')
      search(searchValue)
    }, 500)
  }

  const search = async (searchValue: string) => {
    const data = await queryClient.fetchQuery({
      queryKey: ['pokemon-' + searchValue],
      queryFn: async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + searchValue)
        const data = await response.json()
        return data
      },
      retry: false,
    })

    searchResult.value = [data]
  }

  return { onSearch, searchResult, isSearch }
}
