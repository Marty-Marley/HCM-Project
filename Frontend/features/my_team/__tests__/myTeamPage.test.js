import { shallow } from 'enzyme'
import MyTeamPage from '../components/MyTeamPage'

describe('<MyTeamPage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<MyTeamPage />)
    expect(wrapper)
  })
})
