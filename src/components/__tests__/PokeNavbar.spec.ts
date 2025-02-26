import PokeNavbar from '@/components/PokeNavbar.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const link = [
  {
    name: 'Pokemon',
    url: '/pokemon',
  },
]

describe('PokeNavbar', () => {
  it('renders properly', () => {
    const wrapper = mount(PokeNavbar)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct link', () => {
    const wrapper = mount(PokeNavbar, { props: { link: link } })
    expect(wrapper.text()).toContain('Pokemon')
  })
})
