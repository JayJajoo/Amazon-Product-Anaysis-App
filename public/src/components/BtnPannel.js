import React,{useEffect} from 'react'
import DataViz from './DataViz'
import Summary from './Summary'
import "../styles/btnPannel.css"

function BtnPannel({data}) {

  // useEffect(() => {
  //   if(data){
  //     console.log("From pannel")
  //     console.log(data)
  //   }
  // }, [data]);

  return (
    <div className='btn_pannel'>
        <DataViz reviews={data}></DataViz>
        <Summary></Summary>
    </div>
  )
}

export default BtnPannel