import express from 'express'
import router from './routes/router.js';

const app = express();

app.use('/api/',router)

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`port runing on port:${PORT}`);
    
})