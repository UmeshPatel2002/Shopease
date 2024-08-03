import connectDB from "./db/index.js";
import {app} from './app.js'
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})


connectDB()
.then(()=>{
   console.log('mongodb connected');
}
).catch(error=>
{console.log('connection failed',error)}
)



app.listen(process.env.PORT || 4000,()=>{
   console.log(`server is running at port: ${process.env.PORT}`);
  }
)

