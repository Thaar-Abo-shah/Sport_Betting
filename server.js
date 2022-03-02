const express = require('express')
const { status } = require('express/lib/response');
const axios = require('axios')
const app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server)


const api = require("./api/api");
 

app.use(express.static('public'));


app.set('views', './views')
app.use(express.static('views'))


app.get('/', (req, res) => {
    return res.render('index.html')
});

app.get('/live-betting.html', (req, res) => {
    return res.render('live-betting.html')
});


global.Odds=[];


api.getFixture();




io.on('connection',socket =>{
    //    socket.on('message',data=>{
    //        console.log(data)
    //    })
    //    socket.emit('test',{name:'test'})
          
    socket.emit('TopChamp',global.Odds)
    
        // console.log(resp.data)
        //   socket.on('client-message',(msg)=>{
             
        //       msg2= a;
            
        //       socket.emit('server-message',(msg2))
              
        //   })
    
    // v1.get('/',api.getData)
     
         
     })
    


server.listen(8080)