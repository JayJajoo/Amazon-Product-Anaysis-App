const express=require("express")
const cors=require("cors")
const  {PythonShell} = require("python-shell")
const { Configuration, OpenAIApi } = require("openai");
const { spawn } = require('child_process');

const app=express()
app.use(cors())
require("dotenv").config()
const router=express.Router()

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json())
app.use("/api",router)

router.post("/getReviews",async (req,res)=>{
    const pattern=/([A-Z0-9]{10})\//
    //console.log(req.body.link.match(pattern))
    const asin = req.body.link.match(pattern)[1]
    console.log(asin)
    let options={
        args:[asin]
    }
    await PythonShell.run("./MLmodel/reviews.py",options,(err,result)=>{
        if(err){
          console.log(err)
        }
      })
    res.send("Data extraction successful")
})

router.post("/generateReport",async (req,res)=>{
  await PythonShell.run("./MLmodel/predictor.py",(err,result)=>{
    if(err){
      console.log(err)
    }
    console.log(result)
  })
  // console.log("generate report")
  // const pythonProcess = spawn('python', ["./MLmodel/predictor.py"]);
  // setTimeout(() => {
  //   pythonProcess.kill();
  // }, 60000);
  res.send("Report Generated")
})

router.post("/getReport",async (req,res)=>{
  //console.log("get report")
  const data=await require("./OutputData/preditions.json");
  res.send(data);
})

router.post("/getSummary",async(req,res)=>{
  console.log("OpenAi API called")
  const configuration = new Configuration({
    apiKey: "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",
  });
  
  const reviews=require("./OutputData/preditions.json")
  //const image=require("fs").readFileSync("./OutputData/image.txt", 'utf8')
  let data=""
  reviews.map((rev)=>{
      data+=" "+rev.body;
  })
  data+="\nTl;dr";
  const openai = new OpenAIApi(configuration);
  await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data,
      temperature: 0.7,
      max_tokens: 600,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    }).then((resp)=>{
      console.log("OpenAi API call finished")
      res.send(resp.data.choices[0].text)
  }).catch((err)=>{
    console.log(err)
    res.send("OpenAi failed to generate response")
  })
})

const server = app.listen(5000,()=>{
    console.log("Server started")
})

server.timeout=600000;
