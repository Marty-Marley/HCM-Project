import { shallow } from 'enzyme'
import AddMemberMenu from '../components/MyTeamPage'

const theme = {
  palette: {
    green: {
      light: '#45a621',
      dark: '#317917'
    },
    red: {
      light: '#cd1f1f',
      dark: '#971515'
    }
  },
}

describe('<AddMemberMenu />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<AddMemberMenu />)
    expect(wrapper)
  })
})
