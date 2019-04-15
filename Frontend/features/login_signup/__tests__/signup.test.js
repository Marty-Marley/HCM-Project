import { shallow } from 'enzyme'
import SignUp from '../components/SignUp'

describe('<SignUp />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper)
  })
})
