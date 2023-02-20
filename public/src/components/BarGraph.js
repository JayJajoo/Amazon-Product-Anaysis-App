import React,{useState} from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
function BarGraph({reviews}) {
  
  const [ratings,setRatings]=useState([]);

  useState(()=>{
    if(reviews){
      let initialRatings=[0,0,0,0,0]
      reviews.forEach(rev => {
        initialRatings[Number(rev.rating[0])-1]+=1;
      });
      setRatings(initialRatings)
    }
  },[reviews])

  const prodData={
    labels:["One","Two","Three","Four","Five"],
    datasets:[{
      label:"Ratings",
      data:ratings,
    }]
  }
  return (
    <div><Bar data={prodData}></Bar></div>
  )
}

export default BarGraph