import {config} from 'dotenv'
config()
import express from 'express'
import router from './routes/router.js';


const app = express();
app.use(express.json())

app.use('/api',router)


const PORT = process.env.APP_PORT ;
app.listen(PORT,()=>{
    console.log(`port runing on port:${PORT}`);
    
})