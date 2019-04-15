import { shallow } from 'enzyme'
import RecordPage from '../components/RecordPage'

describe('<RecordPage />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<RecordPage />)
    expect(wrapper)
  })
})
