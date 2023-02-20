import React,{useState,useEffect} from 'react'
import "../styles/dashboard.css"
import Graphs from './Graphs'

function Dashboard({title,setClick,data}) {
  
  const [shut,setShut]=useState(false)

  useEffect(()=>{
    if(shut){
      setClick(false)
    }
  },[shut])

  const handleClose=()=>{
    setShut(true)
  }
  return (
    <div className='dashboard' id="dashboard">
      <div className='head_pannel'>
        <div className='pannel_title'>{title}</div>
        <div>
        <div
          className='close_btn'
          onClick={handleClose}
          >Close
        </div>
        </div>
      </div>
      <>
      {
        title=="Summary of the reviews" 
        &&
        <div className='data'>
            <div className='data_details'>
              {data}
            </div>
        </div>
      }
      </>
      <>
        {
          title=="Visualized Data"
          &&
          <div className='graph_data'>
            <div className='graph_details'>
              <Graphs data={data}></Graphs>
            </div>
          </div>
        }
      </>
    </div>
  )
}

export default Dashboard