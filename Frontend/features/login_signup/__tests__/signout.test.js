import { shallow } from 'enzyme'
import Signout from '../components/Signout'

describe('<Signout />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Signout />)
    expect(wrapper)
  })
})
