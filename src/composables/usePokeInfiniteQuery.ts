import { useInfiniteQuery } from '@tanstack/vue-query'

export const usePokeInfiniteQuery = (isSearch: boolean) => {
  const { data, fetchNextPage, hasNextPage, isError, isPending } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(pageParam)
      const data = await response.json()
      return data
    },
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    getNextPageParam: (lastPage) => lastPage.next,
    refetchOnWindowFocus: false,
    enabled: !isSearch,
    retryOnMount: false,
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isPending,
  }
}
