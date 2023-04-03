import React from 'react'
import { useState,useEffect } from 'react';
import "../styles/search.css"
import axios from 'axios';
import Loader from './Loader';

function Search({setReportGeneration}) {

  const [link,setLink] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isDataExtracted,setIsDataExtracted] =useState(false)
  const [isReportGenerated,setIsReportGenerated] = useState(false)
  const [process,setProcess]=useState("")

  useEffect(()=>{
    const generateReport = async () =>{
      if(isDataExtracted==true && isReportGenerated==false){
        setReportGeneration(false)
        setIsReportGenerated(false)
        setProcess("Generating Report ...")
        setLoading(true)
        const data=await axios.get("http://localhost:5000/api/generateReport")
        console.log(data.data)
        setLoading(false)
        setIsReportGenerated(true)
        setReportGeneration(true);
      }
    }
    generateReport()
  },[isDataExtracted,loading])


  const handleChange=(e) =>{
    setLink(e.target.value)
  }

  const handleSubmit =async () =>{
    setReportGeneration(false)
    setIsReportGenerated(false)
    setIsDataExtracted(false)
    setProcess("Extracting Reviews ...")
    setLoading(true)
    const data = await axios.post("http://localhost:5000/api/getReviews",{
      link:link
    })
    setLoading(false)
    setIsDataExtracted(true)
  }

  return (
    <div id="search_bar">
      <div className='search_bar'>
        <div className='text_area'>
          <input 
            onChange={handleChange}
            type="text" 
            className='text_entry' 
            placeholder='Paste Your Link here'></input>
        </div>
        <button 
        type='button' 
        className='submit_link_button'
        onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <Loader loading={loading} process={process}></Loader>
    </div>
  )
}

export default Search