import { shallow } from 'enzyme'
import LoginPage from '../components/LoginPage'

describe('<LoginPage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<LoginPage />)
    expect(wrapper)
  })
})
