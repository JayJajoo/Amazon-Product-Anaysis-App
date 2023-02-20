import React,{useState,useEffect, useDebugValue} from 'react'
import Dashboard from './Dashboard';
import "../styles/summary.css"
import axios from 'axios';
import Loader from './Loader';

function Summary() {
  const [isSummaryclicked, setIsSummaryClicked] = useState(false);
  const [gotSummary,setGotSummary]=useState(false)
  const [summary,setSummary]=useState(undefined)

  useEffect(()=>{
    if(!isSummaryclicked){
      setGotSummary(false)
    }
  },[isSummaryclicked])

  useEffect(()=>{
    if(isSummaryclicked){
      const getSummary=async ()=>{
        const data = await axios.post("http://localhost:5000/api/getSummary");
        setSummary(data.data);
        setGotSummary(true)
      }
      getSummary();
    }
  },[isSummaryclicked])

  const handleClick=()=>{
    setIsSummaryClicked(true);
  }
  return (
    <div className='summary' onClick={handleClick}>
        Summarize the Data
        {
          isSummaryclicked && gotSummary==false
          &&
          <Loader loading={!gotSummary} process="Getting Summary"></Loader>
        }
        {
            isSummaryclicked && gotSummary
            &&
            <Dashboard 
              title={"Summary of the reviews"} 
              setClick={setIsSummaryClicked}
              data={summary}
            ></Dashboard>
        }
    </div>
  )
}

export default Summary