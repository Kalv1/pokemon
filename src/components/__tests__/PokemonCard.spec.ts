import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PokemonCard from '@/components/PokemonCard.vue'

describe('PokemonCard', () => {
  it('renders properly', () => {
    const wrapper = mount(PokemonCard)
    expect(wrapper.exists()).toBe(true)
  })
})
