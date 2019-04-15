import { shallow } from 'enzyme'
import FeatureCard from '../components/WelcomeBanner'

const currentUser = {}

describe('<FeatureCard />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<FeatureCard currentUser={currentUser} />)
    expect(wrapper)
  })
})
