import React,{useState,useEffect} from 'react'
import "../styles/dataViz.css"
import Dashboard from './Dashboard';

function DataViz({reviews}) {

  const [data,setData]=useState(undefined)

  useEffect(()=>{
    if(reviews){
      setData(reviews)
    }
  },[reviews])

  const [isDvClicked, setIsDvClicked] = useState(false);
  const handleClick=()=>{
    setIsDvClicked(true);
  }
  return (
    <div className='data_viz' onClick={handleClick}>
        Vizualize the Data
        {
          isDvClicked
            &&
          <Dashboard title={"Visualized Data"} setClick={setIsDvClicked} data={data}></Dashboard>
        }
    </div>
  )
}

export default DataViz