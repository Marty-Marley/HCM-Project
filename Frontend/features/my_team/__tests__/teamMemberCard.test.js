import { shallow } from 'enzyme'
import TeamMemberCard from '../components/MyTeamPage'

describe('<TeamMemberCard />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<TeamMemberCard />)
    expect(wrapper)
  })
})
