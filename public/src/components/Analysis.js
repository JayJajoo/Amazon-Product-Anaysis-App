import axios from 'axios';
import React,{useEffect,useState} from 'react'
import "../styles/analysis.css"
import Card from './Card';

function Analysis({isReportGenerated,passReviews}) {
  
  const [isUpdated,setIsUpdated] = useState(false)
  const [reviews, setreviews] = useState(undefined);

  useEffect(()=>{
    if(isUpdated){
      passReviews(reviews)
    }
  },[isUpdated])

  useEffect(() => {
    const getReport=async ()=>{
      if(isReportGenerated){
        setIsUpdated(false)
        const data = await axios.post("http://localhost:5000/api/getReport");
        const list=data.data;
        setreviews(list)
        setIsUpdated(true)
      }
    }
    getReport();
  }, [isReportGenerated]);

  return (
    <div className='analysis_container' id="analysis_container">
      {isUpdated && 
        <div>
          {reviews.map((rev)=>(
            <Card 
              title={rev.title}
              rating={rev.rating}
              body={rev.body}
              review={rev.review}
            ></Card>
          ))}
        </div>}
    </div>
  )
}

export default Analysis