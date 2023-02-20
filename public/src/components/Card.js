import React,{useState,useEffect} from 'react'
import "../styles/card.css"

function Card({title,rating,body,review}) {
  const [color, setcolor] = useState(undefined);
  useEffect(() => {
    if(review=="Positive"){
        setcolor("Green")
    }
    else{
        setcolor("Red")
    }
  }, [review]);
  return (
    <div className='card'
        style={{background:color=="Red" ? 'Red' : 'Green'}}>
        <div className='card_left'>
            <div className='title'>{title}</div>
            <div className='rating'>{rating}</div>
            <div className='body'>{body}</div>
        </div>
        <div className='sep'></div>
        <div className='card_right'>
            <div className='review'>{review}</div>
        </div>
        <br/><br/>
    </div>
  )
}

export default Card