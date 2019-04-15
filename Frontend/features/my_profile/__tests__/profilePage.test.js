import { shallow } from 'enzyme'
import ProfilePage from '../components/ProfilePage'

describe('<ProfilePage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<ProfilePage />)
    expect(wrapper)
  })
})
