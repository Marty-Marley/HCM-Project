import { shallow } from 'enzyme'
import LoginForm from '../components/LoginForm'

describe('<LoginForm />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<LoginForm />)
    expect(wrapper)
  })
})
