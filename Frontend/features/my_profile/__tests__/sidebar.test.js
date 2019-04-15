import { shallow } from 'enzyme'
import Sidebar from '../components/Sidebar'

describe('<Sidebar />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper)
  })
})
