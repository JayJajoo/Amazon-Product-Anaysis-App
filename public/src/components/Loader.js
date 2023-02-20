import React from 'react'
import Hourglass from "../images/Hourglass.gif"
import "../styles/loader.css"

function Loader({loading,process}) {
  return (
    <div>
        {loading==true && 
            <div className='loader' id="loader">
                <div className='loader_animate'>
                  <img className='loader_gif' src={Hourglass}/>
                </div>
                <div className='loader_tag'>
                    {process}
                </div>
            </div>
        }
    </div>
  )
}

export default Loader