import { shallow } from 'enzyme'
import TimeCard from '../components/TimeCard'

const currentUser = {
  timeInfo: {
  }
}
const classes = {
  hours: {}
}

describe('<TimeCard />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<TimeCard currentUser={currentUser} classes={classes}/>)
    expect(wrapper)
  })
})
