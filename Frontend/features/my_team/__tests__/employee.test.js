import { shallow } from 'enzyme'
import Employee from '../components/Employee'

describe('<Employee />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Employee />)
    expect(wrapper)
  })
})
