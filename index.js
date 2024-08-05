import {config} from 'dotenv'
config()
import express from 'express'
import router from './routes/router.js';
import { databasePool } from './config/config.js';


const app = express();
app.use(express.json())

app.use('/api',router)


const PORT = process.env.APP_PORT ;
app.listen(PORT,async()=>{

//    await databasePool.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//       });
    console.log(`port runing on port:${PORT}`);
    
})