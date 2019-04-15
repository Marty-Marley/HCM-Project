import { shallow } from 'enzyme'
import ShowDetailsForm from '../components/ShowDetailsForm'

const classes = {
  sepatator: {
  },
}

const currentUser = {}

describe('<ShowDetailsForm />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<ShowDetailsForm classes={classes} currentUser={currentUser}/>)
    expect(wrapper)
  })
})
