import { useState } from "react";
import Search from "./components/Search";
import Analysis from "./components/Analysis";
import "./App.css"
import BtnPannel from "./components/BtnPannel";
function App() {
  const [reportGenerated,setReportGenerated] = useState(false);
  const [reviews,setReviews]=useState(undefined)

  // useState(()=>{
  //   if(reportGenerated){
  //     console.log("From app.js")
  //     console.log(reviews)
  //   }
  // },[reportGenerated])

  return (
    <div className="App" id="App">
      <Search setReportGeneration={setReportGenerated}></Search>
      {
        reportGenerated 
          &&
        <>
          <BtnPannel data={reviews}></BtnPannel>
          <br/>
          <Analysis isReportGenerated={reportGenerated} passReviews={setReviews} ></Analysis>
        </>
      }
    </div>
  );
}
export default App;
