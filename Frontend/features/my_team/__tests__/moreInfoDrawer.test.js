import { shallow } from 'enzyme'
import MoreInfoDrawer from '../components/MoreInfoDrawer'

describe('<MoreInfoDrawer />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<MoreInfoDrawer />)
    expect(wrapper)
  })
})
