import {config} from 'dotenv'
config()
import express from 'express'
import router from './routes/router.js';
import { databasePool } from './config/config.js';
import cores from 'cors'
import { Server } from 'socket.io';
import http from 'http'
import bodyParser from 'body-parser';


const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cores())

const server = http.createServer(app)

const io = new Server(server)

io.origins(["http://127.0.0.1:5500"])


app.use('/api',router)

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from the client
  socket.on('update score', (msg) => {
      console.log('Message: ' + msg);
      // Broadcast the message to all clients
      io.emit('update score', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});
const PORT = process.env.APP_PORT | 4000 ;

server.listen(PORT,async()=>{

   await databasePool.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    console.log(`port runing on port:${PORT}`);
    
})