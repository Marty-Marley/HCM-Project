import React from 'react'
import { Pie } from 'react-chartjs-2'

const TimeChart = ({ data }) => (
  <Pie
    data={data}
    width={400}
    height={300}
    options={{
      maintainAspectRatio: false
    }}
  />
)


export default TimeChart
