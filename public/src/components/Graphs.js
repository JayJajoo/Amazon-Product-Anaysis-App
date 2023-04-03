import React,{useEffect,useState} from 'react'
import BarGraph from './BarGraph';
import PieChart from './PieChart';
import "../styles/graphs.css"
import BarChart from './BarChart';
import Sociogram from './Sociogram';

function Graphs({data}) {
  return (
    <div className='graphs'>
      <BarGraph reviews={data}></BarGraph>
      <PieChart reviews={data}></PieChart>
      <BarChart reviews={data}></BarChart>
      <Sociogram data={data}></Sociogram>
    </div>
  )
}

export default Graphs