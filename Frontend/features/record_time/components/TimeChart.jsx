import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const TimeChart = ({ data }) => (
  <Doughnut
    data={data}
    width={400}
    height={300}
    options={{
      maintainAspectRatio: false
    }}
  />
)


export default TimeChart
