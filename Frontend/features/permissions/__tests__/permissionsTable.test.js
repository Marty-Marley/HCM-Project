import { shallow } from 'enzyme'
import PermissionsTable from '../components/PermissionsTable'

describe('<PermissionsTable />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<PermissionsTable />)
    expect(wrapper)
  })
})
