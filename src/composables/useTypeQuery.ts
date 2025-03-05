import { useQueries } from '@tanstack/vue-query'

const fetchType = async (type: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
  const data = await response.json()
  return data
}

export const useTypeQuery = (types: string[]) => {
  const results = useQueries({
    queries: types.map((type) => ({
      queryKey: ['type', type],
      queryFn: () => fetchType(type),
      staleTime: Infinity,
    })),
  })

  return { results }
}
