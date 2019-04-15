import { shallow } from 'enzyme'
import TimeChart from '../components/TimeChart'

describe('<TimeChart />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<TimeChart />)
    expect(wrapper)
  })
})
