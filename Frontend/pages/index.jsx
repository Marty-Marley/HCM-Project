import Link from 'next/link'
import User from '../app/components/User'

const Dashboard = () => (
  <>
    <User>
      {({ data: { currentUser } }) => {
        if (currentUser) return <p>{currentUser.name}</p>
        return null
      }}
    </User>
    <h2>This is the dashboard page!</h2>
    <Link href="/team"><a>My Team</a></Link>
  </>
)

export default Dashboard
