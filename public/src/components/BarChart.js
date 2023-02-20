import React,{useState} from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as chartJS} from "chart.js/auto"
function BarChart({reviews}) {
    const [ratings,setRatings]=useState(undefined);
    
    useState(()=>{
      if(reviews){
        let initialRatings=[0,0]
        reviews.forEach(rev => {
            if(rev.review=="Positive"){
                initialRatings[0]+=1;
            }
            else{
                initialRatings[1]+=1;
            }
        });
        setRatings(initialRatings)
      }
    },[reviews])

    const prodData={
        labels:["Positive","Negative"],
        datasets:[{
          label:"Reviews",
          data:ratings,
        }]
    }
    return (
    <div>
      <Bar data={prodData}></Bar>
    </div>
  )
}

export default BarChart