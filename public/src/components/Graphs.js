import React,{useEffect,useState} from 'react'
import BarGraph from './BarGraph';
import PieChart from './PieChart';
import "../styles/graphs.css"
import BarChart from './BarChart';

function Graphs({data}) {
  return (
    <div className='graphs'>
      <BarGraph reviews={data}></BarGraph>
      <PieChart reviews={data}></PieChart>
      <BarChart reviews={data}></BarChart>
    </div>
  )
}

export default Graphs