import React from 'react'
import {Bar,BarChart,CartesianGrid,Legend,ResponsiveContainer,Tooltip,XAxis,YAxis} from "recharts"
import { chartData } from '../assets/data'

export default function Chart({data}) {
 
  return (
    <div style={{ backgroundColor: "#272333", padding: "10px", borderRadius: "8px" }}>
  <ResponsiveContainer width="100%" height={500}>
    <BarChart data={data} color="white">
      <XAxis dataKey="name" color='white' />
      <YAxis color='white'/>
      <Tooltip />
      <Legend color='white' />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="total" fill="teal" />
    </BarChart>
  </ResponsiveContainer>
</div>
  )
}
