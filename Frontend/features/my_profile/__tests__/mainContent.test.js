import { shallow } from 'enzyme'
import MainContent from '../components/MainContent'

describe('<MainContent />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<MainContent />)
    expect(wrapper)
  })
})
