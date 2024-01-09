import { mount } from '@vue/test-utils'
import HomeVue from '../Home.vue'
import { mockArtObjectsItem } from '../../mocks/artObjectsItem'

const mockObjects = [mockArtObjectsItem(), mockArtObjectsItem()]
const mockFunc = jest.fn()
jest.mock('../../composable/useArtObjects', () => ({
  __esModule: true,
  default: () => ({
    artObjects: mockObjects,
    loadNextItems: mockFunc,
    loading: false,
  }),
}))
describe('home Component', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeVue)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.scroll-area').exists()).toBe(true)

    expect(wrapper.find('[data-testid="load-more"').text()).toBe('Load more')
  })
  it('should call loadNextItems when click on button Load more', async () => {
    const wrapper = mount(HomeVue)
    expect(wrapper.find('.container').exists()).toBe(true)

    await wrapper.find('[data-testid="load-more"]').trigger('click')
    expect(mockFunc).toHaveBeenCalled()
  })
})
