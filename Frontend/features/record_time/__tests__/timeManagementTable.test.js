import { shallow } from 'enzyme'
import TimeManagementTable from '../components/RecordPage'

describe('<TimeManagementTable />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<TimeManagementTable />)
    expect(wrapper)
  })
})
