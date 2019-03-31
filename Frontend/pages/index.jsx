import React, { Component } from 'react'
import DashboardPage from '../features/dashboard/components/DashboardPage'

/**
 * Basic dashboard comoponent
 */
class Dashboard extends Component {
  componentDidMount = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.error('Service worker registration failed', err))
    } else {
      console.log('Service worker not supported');
    }
  }

  render() {
    return (
      <DashboardPage />
    )
  }
}

// const Dashboard = () => (
//   <DashboardPage />
// )
export default Dashboard
