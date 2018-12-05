import Link from 'next/link'
import User from '../app/components/User'

/**
 * Basic dashboard comoponent
 */
const Dashboard = () => (
  <>
    <User>
      {({ data: { currentUser } }) => {
        if (currentUser) {
          return (
            <>
              <span>{currentUser.name}</span> <br />
              <span>{currentUser.email}</span> <br />
              <span>{currentUser.permissions}</span> <br />
              <span>{currentUser.entitlements}</span>

              <h2>This is the dashboard page!</h2>
              <ul>
                {currentUser.entitlements.map(entitlement => <li key={entitlement}><Link href={`/${entitlement.toLowerCase()}`}><a>{entitlement}</a></Link></li>)}
              </ul>

            </>
          )
        }
        return null
      }
      }
    </User>
  </>
)

export default Dashboard
