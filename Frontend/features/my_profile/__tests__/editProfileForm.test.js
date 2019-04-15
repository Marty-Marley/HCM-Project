import { shallow } from 'enzyme'
import EditProfileForm from '../components/EditProfileForm'

describe('<EditProfileForm />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<EditProfileForm />)
    expect(wrapper)
  })
})
