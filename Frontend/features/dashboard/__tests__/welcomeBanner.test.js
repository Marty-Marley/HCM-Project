import { shallow } from 'enzyme'
import WelcomeBanner from '../components/WelcomeBanner'

const currentUser = {}

describe('<WelcomeBanner />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<WelcomeBanner currentUser={currentUser}/>)
    expect(wrapper)
  })
})
