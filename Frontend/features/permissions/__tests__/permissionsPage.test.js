import { shallow } from 'enzyme'
import PermissionsPage from '../components/PermissionsPage'

describe('<PermissionsPage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<PermissionsPage />)
    expect(wrapper)
  })
})
