import { shallow } from 'enzyme'
import User from '../components/User'

describe('<User />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<User />)
    expect(wrapper)
  })
})
