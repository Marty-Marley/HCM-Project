import { shallow } from 'enzyme'
import DashboardPage from '../components/WelcomeBanner'

const currentUser = {}

describe('<DashboardPage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<DashboardPage currentUser={currentUser}/>)
    expect(wrapper)
  })
})
